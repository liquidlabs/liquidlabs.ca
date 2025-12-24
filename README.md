# liquidlabs.ca
Static website for Liquid Labs Inc.

## Local development & testing

Recommended: use npx http-server to avoid global installs and to disable caching while you develop.

Start the server (port 8080, disable cache):

```bash
npx http-server . -p 8080 -c-1
```

- Wait a few seconds after starting the server, then check pages:

```bash
curl -I http://localhost:8080/
```

Alternative (Python):

```bash
# Python 3
python3 -m http.server 8080
```

Note: Python's simple server does not disable caching. To stop `http-server`, run `pkill -f http-server` or press Ctrl+C in the terminal where it is running.

---

Keep pages accessible and test any changed pages before pushing.
