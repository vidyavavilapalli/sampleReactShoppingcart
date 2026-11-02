
import useToggle from './useHook';

function ToggleButton(){

    const[isOn, setIsOn] = useToggle(false);
    console.log('isOn value:', isOn);
    return(
        <button onClick={setIsOn}>
            {isOn ? 'ON' : 'OFF'}
        </button>
    )
}

export default ToggleButton;