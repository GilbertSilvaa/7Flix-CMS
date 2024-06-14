import { useParams } from 'react-router-dom'

export function EpisodesView() {
  const { serieId } = useParams()
  console.log(serieId)

  return (
    <div>
      <div className="header-page">
        <h1>Episódios</h1>
      </div>
    </div>
  )
}