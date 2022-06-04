import axios from 'axios'
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

interface IFeedItem {
  id: string;
  media_type: "IMAGE" | "VIDEO"
  media_url: string;
  permalink: string;
}

export function InstaFeed() {
  const [feedList, setFeedList] = useState<IFeedItem[]>([]);

  async function getInstaFeed() {
    const token = import.meta.env.VITE_INSTA_TOKEN;
    const fields = "media_url,media_type,permalink";
    const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`;

    const { data } = await axios.get(url);
    setFeedList(data.data);
  }

  useEffect(() => {
    getInstaFeed()
  }, []);

  return (
    <section className={styles.container}>
      {feedList.map(item => (
        <a key={item.id} href={item.permalink} target="_blank" className={styles.item}>
          {item.media_type === "IMAGE" ? <img src={item.media_url} /> : (
            <video controls>
              <source src={item.media_url}></source>
            </video>
          )}
        </a>
      ))}
    </section>
  )
}