import { Component } from 'react';
import { Button } from './ui/button';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        // You can also log the error to an error reporting service here
        console.error("Error caught by boundary:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-2xl">
                        <div className="text-center space-y-4">
                            <h2 className="text-2xl font-bold text-red-400">Something went wrong</h2>
                            <p className="text-gray-400">
                                We apologize for the inconvenience. Please try refreshing the page.
                            </p>
                            <div className="bg-black/30 rounded-lg p-4 mt-4">
                                <p className="text-sm text-gray-500 font-mono overflow-auto max-h-32">
                                    {this.state.error && this.state.error.toString()}
                                </p>
                            </div>
                            <Button
                                onClick={this.handleReset}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 