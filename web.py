import http.server
import socketserver
import webbrowser
import os
import sys

# Configuration
PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    # Change to the directory where the script is located
    os.chdir(DIRECTORY)
    
    # Setup the server
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            url = f"http://localhost:{PORT}"
            print(f"✅ Local server started at {url}")
            print(f"📂 Serving files from: {DIRECTORY}")
            print("Press Ctrl+C to stop the server.")
            
            # Open the web browser automatically
            webbrowser.open(url)
            
            # Start the loop
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 48 or e.errno == 98: # Address already in use
            print(f"❌ Error: Port {PORT} is already in use.")
            print("Try closing other servers or changing the PORT variable in this script.")
        else:
            print(f"Error: {e}")
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user.")
        sys.exit(0)

if __name__ == "__main__":
    main()