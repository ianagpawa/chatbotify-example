export const Button = (props) => {
    console.log('props', props);
    let {cbFunc, data} = props;

    const getData = () => cbFunc(data);
    return <button onClick={getData}>HELP</button>
}