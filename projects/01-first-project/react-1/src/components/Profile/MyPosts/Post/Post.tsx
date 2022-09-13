import React from 'react'
import styles from './Post.module.css'
// console.log('styles', styles);

type PropsType = {
  message: string
  countLike: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
      <div className={styles.item}>
        <img src="https://images.unsplash.com/photo-1475552113915-6fcb52652ba2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" className={styles.img} alt="photo" />
        {props.message}
        <div>
          <span>like {props.countLike}</span>
        </div>
      </div>
    )
}

export default Post;