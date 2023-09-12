import Loader from 'react-loader-spinner'
import {Component} from 'react'
import BlogItem from '../BlogItem'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

// Dummy data
// const blogsData = [
//   {
//     id: 1,
//     title: 'Blog 1',
//     imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-1-img.png',
//     avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
//     author: 'Author Name',
//     topic: 'React.js',
//   },
//   {
//     id: 2,
//     title: 'Blog 2',
//     imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-2-img.png',
//     avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
//     author: 'Author Name',
//     topic: 'React.js',
//   },
// ]

class BlogsList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  // making api call
  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    // here we convert backend snake_case to frontend camelCase
    const updatedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    // now update the the data replace the dummy data to api data
    this.setState({blogsData: updatedData, isLoading: false})
  }

  render() {
    const {blogsData} = this.state // get the updated api data to the render method
    const {isLoading} = this.state
    return (
      <div className="blog-list-container">
        {/* finally iterate the each item using map and display the results */}
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
