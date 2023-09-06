def test_app_creates(app):
    assert app


def test_app_healthy(client):
    with client:
        resp = client.get("/")
        assert resp.status_code == 200
        assert b"Healthy" in resp.data
        resp = client.post("/")
        assert resp.status_code == 405
