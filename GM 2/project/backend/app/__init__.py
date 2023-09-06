from flask import Flask, make_response, jsonify, request
from flask_jwt_extended import (
    current_user,
    jwt_required,
)
import json
import asyncio
from flask_cors import CORS
from .functionality.model import EtherCallOption
from .functionality.deribit_api import call_api, instruments

from .extensions import cors, db, jwt, ma, migrate, mail, celery
from config import Config, ProductionConfig, TestConfig
import os

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"


def create_app():
    app = Flask(__name__)
    CORS(app)
    env = os.getenv("FLASK_ENV", "production")
    if env == "development":
        app.config.from_object(Config)
    elif env == "testing":
        app.config.from_object(TestConfig)
    else:
        app.config.from_object(ProductionConfig)

    initialize_extensions(app)
    register_blueprints(app)

    def health_check():
        return make_response("Successful Healthcheck", 200)

    def get_api_data():
        async def main():
            tasks = [call_api(instrument) for instrument in instruments]
            return await asyncio.gather(*tasks)

        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            results = loop.run_until_complete(main())
            loop.close()
            combined_results = {instruments[i]: results[i] for i in range(len(instruments))}

            filtered_results = {}
            for instrument, data in combined_results.items():
                filtered_data = {
                    "instrument_name": data["result"]["instrument_name"],
                    "estimated_delivery_price": data["result"]["estimated_delivery_price"],
                    "delta": data["result"]["greeks"]["delta"],
                    "mark_price": data["result"]["mark_price"],
                    "open_interest": data["result"]["open_interest"]
                }
                filtered_results[instrument] = filtered_data

            return jsonify(filtered_results), 200
        except Exception as e:
            app.logger.exception(e)
            return jsonify({"error": "Internal Server Error"}), 500

    def test_vol():
        # Read the JSON file
        with open(r'.config/values.json', 'r') as file:
            data = json.load(file)

        return jsonify(data), 200

    def test_calc():
        data = request.get_json()
        S = float(data["S"])
        K = float(data["K"])
        T = float(data["T"])
        r = float(data["r"]) / 100
        sigma = float(data["sigma"]) / 100

        eth_call_option = EtherCallOption(S, K, T, r, sigma)
        option_price = eth_call_option.black_scholes()
        print(f"Ether call option price: {option_price:.2f}")

        response = {
            'ether_call_option_price': round(option_price, 2)
        }

        return jsonify(response), 200

    def external_alert():
        data = request.get_json()
        if data is not None:
            if "name" in data:
                return make_response("Alerted")
        return make_response("Invalid request.", 400)

    @jwt_required()
    def frontend_alert():
        data = request.get_json()
        if data is not None:
            alert_data = {"id": current_user.id, **data}
            if "name" in alert_data:
                alert_data.pop("name")
            print("Frontend Error: {}", data)
            return make_response("Alerted")
        return make_response("Invalid request.", 400)

    # routes register
    app.add_url_rule("/api", "health_check", health_check)
    app.add_url_rule("/api/test", "get_api_data", get_api_data)
    app.add_url_rule("/api/vol", "test_vol", test_vol)
    app.add_url_rule("/api/calc", "test_calc", test_calc, methods=["POST"])
    app.add_url_rule("/external-alert", "external_alert", external_alert, methods=["POST"])
    app.add_url_rule("/frontend-alert", "frontend_alert", frontend_alert, methods=["POST"])

    return app


def initialize_extensions(app):
    jwt.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    celery.init_app(app)
    ma.init_app(app)
    mail.init_app(app)


def register_blueprints(app):
    from .auth.auth import auth

    app.register_blueprint(auth)
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)

