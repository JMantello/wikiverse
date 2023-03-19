import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
	return (
		<main>
			<h1>WikiVerse</h1>
			<h2 className='underline'>An interesting 📚</h2>
			<PagesList />
		</main>
	)
}