function App() {
    function handleLogin(): string {
        return "HelloWorld";
    }

    return (
        <>
            <button
                className="btn btn-secondary"
                onClick={() => alert(handleLogin())}
            >
                Google login
            </button>
        </>
    );
}

export default App;
