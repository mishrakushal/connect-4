import React from "react";
import "../Game.css";

import {
	GAME_STATE_DRAW,
	GAME_STATE_PLAYING,
	GAME_STATE_WIN,
} from "../Constants";

const Header = ({ winPlayer, currentPlayer, gameState }) => {
	const renderLabel = () => {
		switch (gameState) {
			case GAME_STATE_PLAYING:
				return `Player ${currentPlayer} Turn `;
			case GAME_STATE_WIN:
				return `Player ${winPlayer} Wins! `;
			case GAME_STATE_DRAW:
				return "Game is a draw!";
			default:
		}
	};
	return (
		<div className="panel header">
			<div className="header-text">{renderLabel()}</div>
		</div>
	);
};

export default Header;
