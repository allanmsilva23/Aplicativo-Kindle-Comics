import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { HQS_DATA } from './Tela1';

export default function Tela3({ route, navigation }) {
  const hqInicial = route?.params?.hqSelecionada || HQS_DATA[0];
  const [hq, setHq] = useState(hqInicial);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tamanhoFonte, setTamanhoFonte] = useState(15);
  const [marcadorAtivo, setMarcadorAtivo] = useState(false);

  useEffect(() => {
    if (route?.params?.hqSelecionada) {
      setHq(route.params.hqSelecionada);
      setPaginaAtual(1);
    }
  }, [route?.params?.hqSelecionada]);

  const avancarPagina = () => {
    if (paginaAtual < hq.paginas) setPaginaAtual(paginaAtual + 1);
  };

  const voltarPagina = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.readerHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Tela1')}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.readerHeaderTitle} numberOfLines={1}>
          {hq.titulo}
        </Text>
        <TouchableOpacity onPress={() => setMarcadorAtivo(!marcadorAtivo)}>
          <Ionicons
            name={marcadorAtivo ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color="#F5C518"
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.comicShowcase}>
          <Image source={hq.capa} style={styles.mainCover} />
          <View style={styles.comicMeta}>
            <View style={styles.publisherChip}>
              <Text style={styles.publisherText}>{hq.editora}</Text>
            </View>
            <Text style={styles.comicTitle}>{hq.titulo}</Text>
            <Text style={styles.comicAuthor}>{hq.autor}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="star" size={14} color="#F5C518" />
                <Text style={styles.statValue}>{hq.nota}</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="book-open-outline"
                  size={14}
                  color="#9BA3B5"
                />
                <Text style={styles.statValue}>{hq.paginas} págs</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.controlsBar}>
          <Text style={styles.controlsLabel}>Modo Painel Kindle (Zoom):</Text>
          <View style={styles.fontButtons}>
            <TouchableOpacity
              style={styles.fontBtn}
              onPress={() => setTamanhoFonte(Math.max(12, tamanhoFonte - 2))}
            >
              <Text style={styles.fontBtnText}>A-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fontBtn}
              onPress={() => setTamanhoFonte(Math.min(22, tamanhoFonte + 2))}
            >
              <Text style={styles.fontBtnText}>A+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.readingBox}>
          <Text style={styles.chapterTag}>
            CAPÍTULO {Math.ceil(paginaAtual / 20)} • PÁGINA {paginaAtual} DE{' '}
            {hq.paginas}
          </Text>
          <Text style={[styles.synopsisText, { fontSize: tamanhoFonte }]}>
            {hq.sinopse}
          </Text>
          <Text style={[styles.comicScriptText, { fontSize: tamanhoFonte - 1 }]}>
            [Painel {paginaAtual}.1] A câmera se aproxima sob a chuva intensa. As
            sombras recortam o horizonte da metrópole enquanto o símbolo brilha no
            céu noturno. Cada decisão tomada nesta edição redefine o destino dos
            heróis.
          </Text>
        </View>

        <View style={styles.paginationRow}>
          <TouchableOpacity
            style={[styles.pageBtn, paginaAtual === 1 && styles.pageBtnDisabled]}
            onPress={voltarPagina}
            disabled={paginaAtual === 1}
          >
            <Ionicons name="chevron-back" size={18} color="#0F111A" />
            <Text style={styles.pageBtnText}>Anterior</Text>
          </TouchableOpacity>

          <Text style={styles.pageIndicator}>
            Pág. {paginaAtual} / {hq.paginas}
          </Text>

          <TouchableOpacity style={styles.pageBtn} onPress={avancarPagina}>
            <Text style={styles.pageBtnText}>Próxima</Text>
            <Ionicons name="chevron-forward" size={18} color="#0F111A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.switchTitle}>Trocar leitura rápida:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {HQS_DATA.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.miniThumbWrap,
                hq.id === item.id && styles.miniThumbActive,
              ]}
              onPress={() => {
                setHq(item);
                setPaginaAtual(1);
              }}
            >
              <Image source={item.capa} style={styles.miniThumb} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F111A',
  },
  readerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#262B40',
  },
  readerHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  scrollContent: {
    padding: 16,
  },
  comicShowcase: {
    flexDirection: 'row',
    backgroundColor: '#1A1E2E',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2A3047',
  },
  mainCover: {
    width: 105,
    height: 158,
    borderRadius: 8,
  },
  comicMeta: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  publisherChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E62429',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 6,
  },
  publisherText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  comicTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  comicAuthor: {
    color: '#9BA3B5',
    fontSize: 13,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  controlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#141724',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  controlsLabel: {
    color: '#9BA3B5',
    fontSize: 13,
    fontWeight: '600',
  },
  fontButtons: {
    flexDirection: 'row',
  },
  fontBtn: {
    backgroundColor: '#262B40',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  fontBtnText: {
    color: '#F5C518',
    fontWeight: '800',
    fontSize: 13,
  },
  readingBox: {
    backgroundColor: '#1A1E2E',
    borderRadius: 12,
    padding: 16,
    marginTop: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#F5C518',
  },
  chapterTag: {
    color: '#F5C518',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.6,
  },
  synopsisText: {
    color: '#FFFFFF',
    lineHeight: 23,
    marginBottom: 12,
  },
  comicScriptText: {
    color: '#9BA3B5',
    fontStyle: 'italic',
    lineHeight: 21,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  pageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5C518',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  pageBtnDisabled: {
    opacity: 0.4,
  },
  pageBtnText: {
    color: '#0F111A',
    fontWeight: '800',
    fontSize: 13,
    marginHorizontal: 4,
  },
  pageIndicator: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  switchTitle: {
    color: '#9BA3B5',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  miniThumbWrap: {
    marginRight: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  miniThumbActive: {
    borderColor: '#F5C518',
  },
  miniThumb: {
    width: 54,
    height: 80,
  },
});