
import React from 'react'

const Profile = () => {
    return (
        <div className="container-fluid" id="container-wrapper">
            <div className='row'>
                <div className="col-lg-6">
                    {/* <!-- Dismiss on next click --> */}
                    <div className="card mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Dismiss on next click</h6>
                        </div>
                        <div className="card-body">
                            <p>Use the focus trigger to dismiss popovers on the user’s next click of
                                <code>&lt;a&gt;</code> different element than the toggle element not
                                using<code>&lt;button&gt;.</code>
                            </p>
                            <a tabIndex="0" className="btn btn-primary" role="button" data-toggle="popover" data-trigger="focus"
                                title="Dismissible popover" data-content="And here's some amazing content. It's very engaging. Right?">
                                Dismissiblepopover
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
