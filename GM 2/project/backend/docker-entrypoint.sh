#!/bin/bash
# export STRIPE_API_KEY=sk_test_51LGOpJI7QhX47gxz2idQSrXdq5mPvsjhuodOxbVUfAM3nD9Y5pj5e1K0n2cb9paMpspv5mxv8L2tWJicSvdBC7Ri00obofjQmv
#export STRIPE_API_KEY=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
#export FLASK_ENV=development
#export API_URL=http://localhost
#export FLASK_APP=wsgi.py
#export REDIS_URL=redis://127.0.0.1:6379
#export REDIS_PORT=6379
#export REDIS_HOST=redis://127.0.0.1
#echo "Script executed from: ${PWD}"
gunicorn wsgi:app