import React from 'react'

function LoaderComponent() {
    return (
        <>
            <div class='text-center mt-5 mb-5'>
                <button class="btn btn-light" disabled>
                    <span class="spinner-border spinner-border-sm"></span>
                    Please Wait...
                </button>
            </div>
        </>
    )
}

export default LoaderComponent