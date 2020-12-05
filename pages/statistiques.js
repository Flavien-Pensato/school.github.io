import React from 'react'
import useSWR from 'swr'
import Layout from '../components/Layout'

const Statistiques = () => {
  const { data: stats, mutate } = useSWR('/api/stats', {
    initialData: {},
  });

  console.log(stats)

  return <Layout>À venir</Layout>
}

export default Statistiques
