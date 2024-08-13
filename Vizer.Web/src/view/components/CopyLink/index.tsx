import { useState } from 'react';
import { MdLibraryAddCheck, MdOutlineContentCopy } from 'react-icons/md';
import styles from './styles.module.css';

interface ICopyLinkProps {
  link: string
}

export function CopyLink({ link }: ICopyLinkProps) {
  const [isLinkCopied, setIsLinkCopied] = useState(false)

  function handleCopyLink() {
    navigator.clipboard.writeText(link)
    setIsLinkCopied(true)
    setTimeout(() => setIsLinkCopied(false), 5000)
  }

  return (
    <div className={styles.content}>
      <span>{ link }</span>
      <button onClick={handleCopyLink}>
        { isLinkCopied ? <MdLibraryAddCheck /> : <MdOutlineContentCopy /> }
      </button>
    </div>
  );
}
