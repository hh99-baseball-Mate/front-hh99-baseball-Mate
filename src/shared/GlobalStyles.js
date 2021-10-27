import { createGlobalStyle } from "styled-components";
import {normalize} from 'react-style-reset'
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`

	${normalize}
	*{padding:0; margin:0; box-sizing: border-box;}

	font-family: 'Noto Sans KR';
	
`;
