// @flow

import {pick} from 'ramda';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Status} from '../../constants';
import type {TPoints} from '../../types';
import './style.css';
import logo1 from '../../resources/logo1.png';
import logo2 from '../../resources/logo2.jpg';

type Props = {
    round: number,
    seconds: number,
    red: TPoints,
    blue: TPoints,
    redIsLeft: boolean,
    status: $Keys<typeof Status>,
};

const twoDigits = x => `${(x < 10 ? '0' : '')}${x}`
const toSeconds = s => Math.floor( s % 60);
const toMinutes = s => Math.floor( s / 60);

const SecondaryPoints = ({forbidden, out, nonsport}) => (
    <Fragment>
        <div className="container secondaryPointsContainer">
            <div className="third">
                {forbidden}
            </div>
            <div className="third">
            {out}
            </div>
            <div className="third">
            {nonsport}
            </div>
        </div>
        <div className="container secondaryPointsCaptions">
            <div className="third secondaryPointsCaption">
                Запрещённая техника
            </div>
            <div className="third secondaryPointsCaption">
                Выход за площадку
            </div>
            <div className="third secondaryPointsCaption secondaryPointsCaption--nonSport">
                Неспортивное поведение
            </div>
        </div>
    </Fragment>
);

const Tableau = ({round, seconds, red, blue, redIsLeft, status}: Props) => (
    <div className={`Tableau ${redIsLeft ? 'red-blue' : 'blue-red'}`}>
        <div className="container">
            <div className="third vcontainer">
                <div className="pointsCaption">Баллы</div>
                <div className="points">{blue.points}</div>
            </div>
            <div className="third vcontainer">
                <div className={`time ${ status === Status.PAUSED ? 'time--pause' : ''}`}>
                    {toMinutes(seconds)}:{twoDigits(toSeconds(seconds))}
                </div>
                <div className="round">{round}&nbsp;раунд</div>
            </div>
            <div className="third vcontainer">
                <div className="pointsCaption">Баллы</div>
                <div className="points">{red.points}</div>
            </div>
        </div>

        <div className="container secondaryPoints">
            <div className="half">
                <SecondaryPoints {...blue} />
            </div>
            <div className="half">
                <SecondaryPoints {...red} />
            </div>
        </div>

        <div className="container logos">
            <div className="third logo-logo1">
                <img src={logo1} alt="ФВКР"/>
            </div>
            <div className="third logo-url">
                www.kavkazlions.ru
            </div>
            <div className="third logo-logo2">
                <img src={logo2} alt="ДЮСШ" />
            </div>
        </div>

    </div>
);

const mapStateToProps = pick(['round', 'seconds', 'red', 'blue', 'redIsLeft', 'status']);

export default connect(mapStateToProps)(Tableau);
