import "./BtnsPosNeg.css";

export default function BtnsPosNeg(props) {
    let b;
    switch (props.passed) {
        case 'none':
            b = <DrawButtons />;
            break;
        case 'pos':
            // b = "ДА";
            b = null;
            break;
        case 'neg':
            // b = "НЕТ";
            b = null;
            break;
        default:
    }
    return <div>{b}</div>;

    function DrawButtons() {
        return (
            <div className="center-cont">
                <div className="for-center-btn"><button className="btns pos-neg-btn pos-btn" onClick={() => a('pos')}>&#10004; Помню</button></div>
                <div className="for-center-btn"><button className="btns pos-neg-btn neg-btn" onClick={() => a('neg')}>&#10006; Не помню</button></div>
            </div>
        );
    }

    function a(answer) {
        props.func(answer);
    }
}
