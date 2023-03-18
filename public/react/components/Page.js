import React, { useState } from 'react';
import apiURL from '../api';

export const Page = (props) => {
  const {
    page,
    view, setView,
    showDetails,
    backToHome,
    deletePage
  } = props

  if (view === "Home") {
    return <div className="pageTitleClickable" onClick={showDetails}>
      <h3>{page.title}</h3>
    </div>
  }

  if (view === "Details") {
    return <div id="pageDetails">
      <h3>Title: {page.title}</h3>
      <p>Author: {page.author.name}</p>
      <p>Content: {page.content}</p>
      <p id="tags"> Tags:
        {page.tags.map(t => (
          <span> {t.name} </span>
        ))}
      </p>
      <p>Date Created: {new Date(page.createdAt).toLocaleDateString()}</p>
      <span className="buttons">
        <button onClick={backToHome}>Back</button>
        <button onClick={deletePage}>Delete Page</button>
      </span>
    </div>
  }

  const [inputs, setInputs] = useState({})

  const changeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const postPage = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiURL}/wiki`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      })
      setInputs({})
      backToHome()
    } catch (err) {
      console.log(`Error posting inputs to api`, err)
    }
  }

  if (view === "Add") {
    return <>
      <h2>Add a Page</h2>
      <form id="addPageForm" onSubmit={postPage}>
        <label>Title:&nbsp;
          <input
            type="text"
            name="title"
            value={inputs.title || ""}
            onChange={changeInput}
          />
        </label><br />
        <label>Article Content:&nbsp;
          <input
            type="text"
            name="content"
            value={inputs.content || ""}
            onChange={changeInput}
          />
        </label><br />
        <label>Author Name:&nbsp;
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={changeInput}
          />
        </label><br /><label>Author Email:&nbsp;
          <input
            type="text"
            name="email"
            value={inputs.email || ""}
            onChange={changeInput}
          />
        </label><br /><label>Tags (seperated by space):&nbsp;
          <input
            type="text"
            name="tags"
            value={inputs.tags || ""}
            onChange={changeInput}
          />
        </label><br />
        <input type="submit" />
      </form>
    </>
  }
}
