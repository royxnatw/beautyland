
/**
 * 
 */

import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import LightBox from './LightBox';

import './PostDisplayer.css';

export default class PostDisplayer extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      post: props.post,
      isBoxOpen: false,
      boxContentType: null,
      boxContent: null
    };
  }

  callGoBackHandler = () => {
    this.props.goBackHandler();
  };

  openImageBox = (index, event) => {
    const post = this.state.post;
    this.setState({
      isBoxOpen: true,
      boxContentType: 'image',
      boxContent: (post.images)? post.images[index].url: post.imgUrls[index]
    });
  };

  closeLightBox = () => {
    this.setState( {isBoxOpen: false} );
  }

  // Show post info in the lightbox
  openInfoBox = () => {
    this.setState({
      isBoxOpen: true, 
      boxContentType: 'text',
      boxContent: this.state.post
    });
  };

  getPostImageList = () => {
    const post = this.state.post;
    const imglist = [];
    if(post && post.images){
      post.images.forEach(element => {
        let temp = {};
        temp.src = element.url;
        temp.thumbnail = temp.src;
        // if the image has no width/height data, give them default value
        // CAUTION: the image aspect ratio will be broken.
        temp.thumbnailWidth = element.width || 300;  
        temp.thumbnailHeight = element.height || 300;
        imglist.push(temp);
      });
    }else if(post){  // compatible for old post data structure
      post.imgUrls.forEach(x => {
        let temp = {};
        temp.src = x;
        temp.thumbnail = x;
        // the old post data structure doesn't contain width/height data
        // we have to set some default value for them
        temp.thumbnailWidth = 300; 
        temp.thumbnailHeight = 300;
        imglist.push(temp);
      });
    }else{
      console.log('No any post data');
    }
    return imglist;
  };

  render(){
    return (
      <div className='postDisplayer'>
        <div className='btnBack' title='Go back' onClick={this.callGoBackHandler}>
          <i className="material-icons">chevron_left</i>
        </div>
        {
          (this.props.post) && (
            <div>
              <div className='btnPostInfo' title='Post information' onClick={this.openInfoBox}>
                <i className="material-icons">help_outline</i>
              </div>
              <Gallery images={this.getPostImageList()}
                rowHeight={300}
                enableImageSelection={false}
                onClickThumbnail={this.openImageBox}
              />
              <LightBox 
                isOpen={this.state.isBoxOpen} 
                type={this.state.boxContentType}
                content={this.state.boxContent} 
                onCloseLightBox={this.closeLightBox} 
              />
            </div>
          )
          
        }
      </div>
    );
  }
}