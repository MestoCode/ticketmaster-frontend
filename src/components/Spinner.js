function Spinner() {
    return (
        <div className="flex justify-center items-center py-16">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-primary_hint border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 border-4 border-primary_important border-b-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    );
}

export default Spinner;

