export const Button = (props) => {
    let {cbFunc, data} = props;

    const getData = (e) => {
        // e.stopPropagation();
        cbFunc(data);
    };
    return <button onClick={getData}>HELP</button>
}