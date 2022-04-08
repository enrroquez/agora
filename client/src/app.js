import React from "react";

export default class App extends React.Component{
    constructor(props){
        super(props);
            super(props);
            this.state={
                uploaderIsVisible:false // it can be removed, because the first time it is used
            };
        }

        componentDidMount(){
            fetch('/user').then(
                res=>res.json()
            ).then(
                data=>{ //first name, last name, etc.
                    this.setState(data)
                }
            );
        }

        render(){//when ever state changes render runs again
            if(!this.state.id){
                return <img src="spinner.gif" alt="Loading..." />
            }
            return(
                <>
                <img src="/logo.gif" alt="logo"/>
                clickHandler={()=> this.state({ //in some docs recommend no to run a function inside render() for performance concerns
                    uploaderIsVisible: true
                    //img
                })}
                <ProfilePic 
                    imageUrl={this.state.imageUrl}
                    clickHandler={()=> this.setState({
                        uploaderIsVisible:true
                    })}
                />

                {this.state.uploaderIsVisible && <Uploader />}

                </>
            )
        }
    }
}