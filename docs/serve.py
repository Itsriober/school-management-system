#!/usr/bin/env python3
"""
Simple HTTP server for Itsriober School Management System Documentation
Run this script to serve the documentation locally and avoid CORS issues.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8080
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler to add CORS headers and better error handling"""
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Handle root path
        if self.path == '/':
            self.path = '/index.html'
        
        # Serve files
        try:
            super().do_GET()
        except Exception as e:
            print(f"Error serving {self.path}: {e}")
    
    def log_message(self, format, *args):
        """Custom log format"""
        print(f"[{self.date_time_string()}] {format % args}")

def main():
    """Main function to start the server"""
    
    # Change to the docs directory
    docs_dir = Path(__file__).parent
    os.chdir(docs_dir)
    
    print("🏫 Itsriober School Management System Documentation Server")
    print("=" * 60)
    print(f"📁 Serving from: {docs_dir}")
    print(f"🌐 Server URL: http://{HOST}:{PORT}")
    print("=" * 60)
    
    # Check if required files exist
    required_files = ['index.html', 'css/documentation.css', 'js/documentation.js']
    missing_files = []
    
    for file in required_files:
        if not Path(file).exists():
            missing_files.append(file)
    
    if missing_files:
        print("❌ Missing required files:")
        for file in missing_files:
            print(f"   - {file}")
        print("\nPlease ensure all documentation files are present.")
        return 1
    
    try:
        # Create server
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            print(f"✅ Server started successfully!")
            print(f"📖 Open your browser to: http://{HOST}:{PORT}")
            print("\n💡 Tips:")
            print("   - Use Ctrl+C to stop the server")
            print("   - The server will automatically handle CORS for markdown files")
            print("   - All documentation pages should now work correctly")
            print("\n🚀 Starting server...")
            print("-" * 60)
            
            # Try to open browser automatically
            try:
                webbrowser.open(f'http://{HOST}:{PORT}')
                print("🌐 Browser opened automatically")
            except Exception:
                print("🌐 Please open your browser manually")
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped by user")
        return 0
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use!")
            print(f"💡 Try a different port: python serve.py --port 8081")
            return 1
        else:
            print(f"❌ Server error: {e}")
            return 1
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return 1

if __name__ == '__main__':
    # Handle command line arguments
    if len(sys.argv) > 1:
        if '--help' in sys.argv or '-h' in sys.argv:
            print("Itsriober School Documentation Server")
            print("Usage: python serve.py [--port PORT]")
            print("       python serve.py --help")
            print("")
            print("Options:")
            print("  --port PORT    Specify port number (default: 8080)")
            print("  --help, -h     Show this help message")
            sys.exit(0)
        
        if '--port' in sys.argv:
            try:
                port_index = sys.argv.index('--port') + 1
                PORT = int(sys.argv[port_index])
            except (IndexError, ValueError):
                print("❌ Invalid port number")
                sys.exit(1)
    
    sys.exit(main())
