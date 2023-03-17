import React, { useState } from 'react';
import { Page } from './Page';

export const PagesList = ({ pages, view, setView }) => {
	const [selectedPage, setSelectedPage] = useState(null)

	function pageClick(page) {
		setSelectedPage(page)
		setView("Details")
	}

	function backToHome() {
		setView("Home")
		setSelectedPage(null)
	}

	function pageComponent(page) {
		return <Page
			page={page}
			view={view}
			setView={setView}
			showDetails={() => pageClick(page)}
			backToHome={() => backToHome()}
		/>
	}

	if (view === "Home") {
		return <div id="pageList">
			{pages.map((page) => (pageComponent(page)))}
		</div>
	}

	if (view === "Details")
		return pageComponent(selectedPage)
} 
