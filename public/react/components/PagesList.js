import React, { useState } from 'react';
import { Page } from './Page';
import apiURL from '../api';

export const PagesList = ({ pages, view, setView }) => {
	const [selectedPage, setSelectedPage] = useState(null)

	function pageComponent(page) {
		return <Page
			page={page}
			view={view}
			setView={setView}
			showDetails={async () => pageClick(page)}
			backToHome={backToHome}
		/>
	}

	async function pageClick(page) {
		// Fetch page to get author and tags
		try {
			const res = await fetch(`${apiURL}/wiki/${page.slug}`)
			const pageData = await res.json()
			setSelectedPage(pageData)
			setView("Details")
		} catch (err) {
			console.log(`Error fetching page id ${page.id}\n`, err)
		}
	}

	function backToHome() {
		setView("Home")
		setSelectedPage(null)
	}

	if (view === "Home") {
		return <div id="pageList">
			{pages.map((page) => (pageComponent(page)))}
			<button onClick={() => setView("Add")}>Add Page</button>
		</div>
	}

	if (view === "Details")
		return pageComponent(selectedPage)

	if (view === "Add") {
		return pageComponent(<Page />)
	}
} 
