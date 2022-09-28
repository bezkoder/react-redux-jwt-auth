import React, { Component } from 'react';
export default class FilesUploadComponent extends Component {
    render() {
        return (
            <div >
                <input type="file" />
                <button className="btn btn-primary" type="submit">Upload</button>
            </div>
        )
    }
}