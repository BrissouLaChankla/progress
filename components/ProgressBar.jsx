const ProgressBar = ({ value, min, max, color }) => {
    const normalizedValue = Math.min(Math.max(value, min), max);

    const percentage = ((normalizedValue - min) / (max - min)) * 100;

    return (
        <div className="w-full bg-base-300 rounded-lg h-3 overflow-hidden relative">
            <span className="absolute text-[.7rem] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                {Math.round(percentage)}%
            </span>
            <div
                className="h-full bg-primary  transition-all duration-300"
                style={{ width: `${percentage}%` }}
            >
            </div>
        </div>
    );
};

export default ProgressBar;