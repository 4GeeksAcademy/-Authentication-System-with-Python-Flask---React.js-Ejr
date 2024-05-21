import React from 'react'
import { useParams } from 'react-router-dom'

const Course = () => {
    const params = useParams()

  return (
    <div>
      <div>Course {params.id}</div>
    </div>
  )
}

export default Course