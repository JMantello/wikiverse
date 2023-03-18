import React, { useEffect, useState } from 'react';
import { Page } from './Page';
import apiURL from '../api';

export const PagesList = ({ view, setView }) => {
	const [pages, setPages] = useState([])
	const [selectedPage, setSelectedPage] = useState(null)

	async function fetchPages() {
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPages()
	}, [])

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
		fetchPages();
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
		return pageComponent()
	}
} 
