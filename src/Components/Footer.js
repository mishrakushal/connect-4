import React from "react";

const Footer = ({ onNewGameClickEvent, onSuggestClickEvent }) => {
	return (
		<div className="panel footer">
			<button onClick={onNewGameClickEvent}>New Game</button>
			<button onClick={onSuggestClickEvent}>Suggest</button>
		</div>
	);
};

export default Footer;
