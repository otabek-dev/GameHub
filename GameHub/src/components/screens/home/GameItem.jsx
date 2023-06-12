import style from './game.module.css';

const GameItem = ({name, creator, id}) => {
    return (
        <div className={style.game}>
            <div className={style.game__content}>
                <span>{name}</span>
                <div className={style.game__info}>
                    <span>Creator: {creator}</span>
                    <span>Id: {id}</span>
                </div>
            </div>
            <div className={style.game__btn}>
                <button>Join Game</button>
            </div>
        </div>
    );
};

export default GameItem;