import asyncio
import websockets
import json
import pprint
import nest_asyncio

nest_asyncio.apply()

instruments = [
    "ETH-30JUN23-1700-C",
    "ETH-30JUN23-1800-C",
    "ETH-30JUN23-1900-C",
    "ETH-30JUN23-2000-C",
    "ETH-30JUN23-2100-C",
    "ETH-30JUN23-2200-C",
    "ETH-30JUN23-2300-C",
    "ETH-30JUN23-2400-C",
]


def create_msg(instrument):
    return {
        "jsonrpc": "2.0",
        "id": 8106,
        "method": "public/ticker",
        "params": {
            "instrument_name": instrument
        }
    }


async def call_api(instrument):
    msg = create_msg(instrument)
    async with websockets.connect('wss://test.deribit.com/ws/api/v2') as websocket:
        await websocket.send(json.dumps(msg))
        while websocket.open:
            response = await websocket.recv()
            json_par = json.loads(response)
            pprint.pprint(json_par)
            return json_par

# msg = \
#     {
#         "jsonrpc": "2.0",
#         "id": 3659,
#         "method": "public/get_book_summary_by_instrument",
#         "params": {
#             "instrument_name": None
#         }
#     }
#
#
# async def call_api(msg, instrument):
#     msg["params"]["instrument_name"] = instrument
#     async with websockets.connect('wss://test.deribit.com/ws/api/v2') as websocket:
#         await websocket.send(json.dumps(msg))
#         while websocket.open:
#             response = await websocket.recv()
#             json_par = json.loads(response)
#             pprint.pprint(json_par)
#             return json_par

#
# async def main():
#     tasks = [call_api(msg, instrument) for instrument in instruments]
#     await asyncio.gather(*tasks)

# async def call_api(msg):
#     async with websockets.connect('wss://test.deribit.com/ws/api/v2') as websocket:
#     # async with websockets.connect('wss://test.deribit.com/den/ws') as websocket:
#         await websocket.send(msg)
#         while websocket.open:
#             response = await websocket.recv()
#             json_par = json.loads(response)
#             pprint.pprint(json_par)
#             return json_par

# asyncio.get_event_loop().run_until_complete(call_api(json.dumps(msg)))
