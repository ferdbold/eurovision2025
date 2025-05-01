import React from "react";

interface IButtonProps {
	type: 'submit'|'reset'|'button'|undefined;
	className?: string
	children: React.ReactNode
}

export const Button = function(props: IButtonProps) {
	return <button type={props.type} className={`font-bold text-xl uppercase rounded-xl p-4 border border-blue-700 shadow-md bg-blue-900 hover:bg-blue-800 active:bg-blue-600 ${props.className || ''}`}>
		{props.children}
	</button>
}