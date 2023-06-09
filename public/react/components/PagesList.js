import React, { useEffect, useState } from 'react';
import { Page } from './Page';
import apiURL from '../api';

export const PagesList = () => {
	// States
	const [view, setView] = useState("Home")
	const [pages, setPages] = useState([])
	const [selectedPage, setSelectedPage] = useState(null)

	// On-load
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

	// Functions
	function pageComponent(page) {
		return <Page
			page={page}
			view={view}
			setView={setView}
			showDetails={async () => pageClick(page)}
			backToHome={backToHome}
			deletePage={async () => deletePage(page)}
		/>
	}

	async function pageClick(page) {
		// Re-fetch page to get author and tags
		try {
			const res = await fetch(`${apiURL}/wiki/${page.slug}`)
			const pageData = await res.json()
			setSelectedPage(pageData)
			setView("Details")
		} catch (err) {
			console.log(`Error fetching page id ${page.slug}\n`, err)
		}
	}

	function backToHome() {
		fetchPages();
		setView("Home")
		setSelectedPage(null)
	}

	async function deletePage(page) {
		try {
			if (!confirm("Confirm delete?"))
				return
			const res = await fetch(`${apiURL}/wiki/${page.slug}`, {
				method: "DELETE",
			})
			backToHome()
		} catch (err) {
			console.log(`Error deleting page: ${page.slug}\n`, err)
		}
	}

	// Views
	if (view === "Home") {
		return <div id="pageList">
			<ol>
				{pages.map((page) => (<li>{pageComponent(page)}</li>))}
			</ol>
			<div className="buttons">
				<button onClick={() => setView("Add")}>Add Page</button>
			</div>
		</div>
	}

	if (view === "Details")
		return pageComponent(selectedPage)

	if (view === "Add")
		return pageComponent()
} 
