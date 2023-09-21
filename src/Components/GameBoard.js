import React, { useEffect, useState } from "react";
import GameCircle from "./GameCircle";

import "../Game.css";
import Header from "./Header";
import Footer from "./Footer";
import { getComputerMove, isDraw, isWinner } from "../helper";

import {
	GAME_STATE_PLAYING,
	GAME_STATE_WIN,
	CIRCLE_COUNT,
	NO_PLAYER,
	PLAYER_1,
	PLAYER_2,
	GAME_STATE_DRAW,
} from "../Constants";

const GameBoard = () => {
	const [gameBoard, setGameBoard] = useState(
		Array(CIRCLE_COUNT).fill(NO_PLAYER)
	);
	const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
	const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
	const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

	useEffect(() => {
		initGame();
	}, []);

	const initGame = () => {
		console.log("Init game");
		setGameBoard(Array(CIRCLE_COUNT).fill(NO_PLAYER));
		setCurrentPlayer(PLAYER_1);
		setGameState(GAME_STATE_PLAYING);
	};

	const renderCircle = (id) => {
		return (
			<GameCircle
				key={id}
				id={id}
				className={`player_${gameBoard[id]}`}
				onCircleClicked={circleClickedHandler}
			/>
		);
	};

	const initBoard = () => {
		const circles = [];
		for (let i = 0; i < CIRCLE_COUNT; ++i) {
			circles.push(renderCircle(i));
		}
		return circles;
	};

	const suggestClickEventHandler = () => {
		console.log("SUGGEST!");
		const move = getComputerMove(gameBoard);
		circleClickedHandler(move);
	};

	const circleClickedHandler = (id) => {
		console.log("circle clicked: " + id);

		if (gameBoard[id] !== NO_PLAYER) {
			return;
		}

		if (gameState !== GAME_STATE_PLAYING) {
			return;
		}

		if (isWinner(gameBoard, id, currentPlayer)) {
			setGameState(GAME_STATE_WIN);
			setWinPlayer(currentPlayer);
		}

		if (isDraw(gameBoard, id, currentPlayer)) {
			setGameState(GAME_STATE_DRAW);
			setWinPlayer(NO_PLAYER);
		}

		setGameBoard((prev) => {
			return prev.map((currentValue, position) => {
				if (position === id) {
					return currentPlayer;
				}
				return currentValue;
			});
		});

		setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);

		console.log(id);
		console.log(gameBoard[id]);
		console.log(currentPlayer);
	};

	return (
		<div className="board-wrapper">
			<Header
				winPlayer={winPlayer}
				currentPlayer={currentPlayer}
				gameState={gameState}
			/>
			<div className="gameBoard">{initBoard()}</div>
			<Footer
				onNewGameClickEvent={initGame}
				onSuggestClickEvent={suggestClickEventHandler}
			/>
		</div>
	);
};

export default GameBoard;
