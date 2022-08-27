export default function BtnsPosNeg(props) {
    let b;
    switch (props.passed) {
        case 0:
            b = <DrawButtons />;
            break;
        case 1:
            b = "ДА";
            break;
        case 2:
            b = "НЕТ";
            break;
        default:
    }
    return <div>{b}</div>;

    function DrawButtons() {
        return (
            <>
                <button onClick={() => a(1)}>Да</button>
                <button onClick={() => a(2)}>Нет</button>
            </>
        );
    }

    function a(answer) {
        props.func(answer);
    }
}
