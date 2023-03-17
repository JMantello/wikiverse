import React from 'react';

export const Page = ({ page, view, setView, showDetails, backToHome }) => {

  if (view === "Home") {
    return <div id="page" onClick={() => showDetails()}>
      <h3>{page.title}</h3>
    </div>
  }

  else if (view === "Details") {
    return <div id="page">
      <h3>{page.title}</h3>
      <p>{page.author}</p>
      <p>{page.content}</p>
      <p>{page.tags}</p>
      <p>{page.createdAt}</p>
      <button onClick={() => backToHome()}>Back</button>
    </div>
  }
}
