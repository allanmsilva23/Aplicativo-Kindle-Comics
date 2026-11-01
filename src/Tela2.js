import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HQS_DATA } from './Tela1';

export default function Tela2({ navigation }) {
  const [filtro, setFiltro] = useState('Todas');
  const [modoGrade, setModoGrade] = useState(false);
  const [favoritos, setFavoritos] = useState(['1', '2']);
  const [downloads, setDownloads] = useState(['1', '2', '3', '4', '8']);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleDownload = (id) => {
    setDownloads((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const listaExibida = HQS_DATA.filter((hq) => {
    if (filtro === 'Baixadas') return downloads.includes(hq.id);
    if (filtro === 'Favoritas') return favoritos.includes(hq.id);
    return true;
  });

  const renderItem = ({ item }) => {
    const isFav = favoritos.includes(item.id);
    const isDown = downloads.includes(item.id);

    if (modoGrade) {
      return (
        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => navigation.navigate('Tela3', { hqSelecionada: item })}
        >
          <Image source={item.capa} style={styles.gridCover} />
          <Text style={styles.gridTitle} numberOfLines={1}>
            {item.titulo}
          </Text>
          <Text style={styles.gridSub}>{item.editora}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.listCard}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Tela3', { hqSelecionada: item })}
      >
        <Image source={item.capa} style={styles.listCover} />
        <View style={styles.listContent}>
          <View style={styles.badgeRow}>
            <Text
              style={[
                styles.editoraTag,
                {
                  backgroundColor:
                    item.editora === 'Marvel' ? '#E62429' : '#0476F2',
                },
              ]}
            >
              {item.editora}
            </Text>
            <Text style={styles.pagesText}>{item.paginas} págs</Text>
          </View>
          <Text style={styles.listTitle} numberOfLines={1}>
            {item.titulo}
          </Text>
          <Text style={styles.listAuthor}>{item.autor}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => toggleDownload(item.id)}
            >
              <Ionicons
                name={isDown ? 'cloud-done' : 'cloud-download-outline'}
                size={18}
                color={isDown ? '#4CD964' : '#9BA3B5'}
              />
              <Text
                style={[
                  styles.actionText,
                  { color: isDown ? '#4CD964' : '#9BA3B5' },
                ]}
              >
                {isDown ? 'Baixada' : 'Baixar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => toggleFavorito(item.id)}
            >
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={18}
                color={isFav ? '#FF3B30' : '#9BA3B5'}
              />
              <Text
                style={[
                  styles.actionText,
                  { color: isFav ? '#FF3B30' : '#9BA3B5' },
                ]}
              >
                {isFav ? 'Favorita' : 'Favoritar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Sua Biblioteca HQ</Text>
          <Text style={styles.headerSubtitle}>
            {listaExibida.length} quadrinhos disponíveis
          </Text>
        </View>
        <TouchableOpacity
          style={styles.viewToggleBtn}
          onPress={() => setModoGrade(!modoGrade)}
        >
          <Ionicons
            name={modoGrade ? 'list' : 'grid'}
            size={20}
            color="#F5C518"
          />
        </TouchableOpacity>
      </View>

      {/* Abas de Filtro */}
      <View style={styles.filterRow}>
        {['Todas', 'Baixadas', 'Favoritas'].map((aba) => {
          const ativa = filtro === aba;
          return (
            <TouchableOpacity
              key={aba}
              style={[styles.filterTab, ativa && styles.filterTabActive]}
              onPress={() => setFiltro(aba)}
            >
              <Text
                style={[styles.filterText, ativa && styles.filterTextActive]}
              >
                {aba}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        key={modoGrade ? 'G' : 'L'}
        data={listaExibida}
        numColumns={modoGrade ? 2 : 1}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F111A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#9BA3B5',
    fontSize: 12,
    marginTop: 2,
  },
  viewToggleBtn: {
    backgroundColor: '#1A1E2E',
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A3047',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterTab: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: '#1A1E2E',
    marginRight: 8,
  },
  filterTabActive: {
    backgroundColor: '#F5C518',
  },
  filterText: {
    color: '#9BA3B5',
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#0F111A',
    fontWeight: '800',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1E2E',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#262B40',
  },
  listCover: {
    width: 78,
    height: 116,
    borderRadius: 6,
  },
  listContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editoraTag: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pagesText: {
    color: '#8A94A6',
    fontSize: 11,
  },
  listTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  listAuthor: {
    color: '#9BA3B5',
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  gridCard: {
    flex: 1,
    backgroundColor: '#1A1E2E',
    borderRadius: 12,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  gridCover: {
    width: 120,
    height: 178,
    borderRadius: 6,
    marginBottom: 8,
  },
  gridTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  gridSub: {
    color: '#F5C518',
    fontSize: 11,
    marginTop: 2,
  },
});