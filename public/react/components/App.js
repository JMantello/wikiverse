import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
	// WikiPages
	// Views: home, details
	const [view, setView] = useState("Home")

	return (
		<main>
			<h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
			<PagesList view={view} setView={setView} />
		</main>
	)
}