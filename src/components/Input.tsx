import { debounce } from "lodash";
import { useMemo, useState, type ChangeEvent, type ReactElement } from "react";

type InputType = {
    /** Will run on input change. */
    onChange: (value: string) => void;
    /** If defined, the input change will be debounced by this value in milliseconds.  */
    debounceMs?: number;
};
const Input = (props: InputType): ReactElement => {
    const { debounceMs, onChange } = props;

    const [inputValue, setInputValue] = useState("");

    const debouncedTransition = useMemo(
        () =>
            debounce((value: string) => {
                onChange(value);
            }, debounceMs),
        [debounceMs, onChange],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        if (debounceMs) {
            debouncedTransition(newValue);
        } else {
            onChange(newValue);
        }
    };

    return <input type="text" value={inputValue} onChange={handleChange} />;
};

export default Input;
