"use client"
import "./myfooter.css"

function Footer() {

    return (
        <div id="footer-root">
            <div className={"about-part"}
                 tabIndex={1}
                 onClick={(e)=>e.currentTarget.focus()}
            >
                This is a simple note-taking application.
                All notes will be saved to local storage.
            </div>
            <div className='footer-container'>

                <button
                    value={"About"}
                    className={"transparent about-button"}
                    tabIndex={1}>
                        About
                </button>

                <button className={"button transparent"}>
                    Creator: Ruslan Zeynalov
                </button>
            </div>
        </div>
    )
}

export default Footer