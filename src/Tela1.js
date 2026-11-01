import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const HQS_DATA = [
  {
    id: '1',
    titulo: 'Batman: O Cavaleiro das Trevas',
    autor: 'Frank Miller',
    editora: 'DC Comics',
    categoria: 'DC Comics',
    progresso: 78,
    paginas: 224,
    nota: '4.9',
    baixado: true,
    naBiblioteca: true,
    capa: require('./assets/hq1.jpg'),
    sinopse:
      'Dez anos após se aposentar, um Bruce Wayne grisalho retorna à ativa em uma Gotham City distópica dominada pela gangue dos Mutantes, enfrentando seu maior aliado em um confronto épico.',
  },
  {
    id: '2',
    titulo: 'Watchmen: Edição Definitiva',
    autor: 'Alan Moore & Dave Gibbons',
    editora: 'DC Comics',
    categoria: 'Clássicos',
    progresso: 45,
    paginas: 416,
    nota: '5.0',
    baixado: true,
    naBiblioteca: true,
    capa: require('./assets/hq2.jpg'),
    sinopse:
      'Em uma Guerra Fria alternativa de 1985, o assassinato do Comediante leva Rorschach a investigar uma conspiração que ameaça o passado dos vigilantes mascarados e o futuro da humanidade.',
  },
  {
    id: '3',
    titulo: 'Guerra Civil',
    autor: 'Mark Millar & Steve McNiven',
    editora: 'Marvel',
    categoria: 'Marvel',
    progresso: 92,
    paginas: 208,
    nota: '4.8',
    baixado: true,
    naBiblioteca: true,
    capa: require('./assets/hq3.jpg'),
    sinopse:
      'Após uma tragédia em Stamford, o governo aprova a Lei de Registro de Super-Humanos. Homem de Ferro lidera o lado pró-registro, enquanto o Capitão América comanda a resistência clandestina.',
  },
  {
    id: '4',
    titulo: 'Batman: A Piada Mortal',
    autor: 'Alan Moore & Brian Bolland',
    editora: 'DC Comics',
    categoria: 'DC Comics',
    progresso: 100,
    paginas: 64,
    nota: '4.9',
    baixado: true,
    naBiblioteca: true,
    capa: require('./assets/hq4.jpg'),
    sinopse:
      'O Coringa escapa do Asilo Arkham determinado a provar que basta "um dia ruim" para levar qualquer homem são à completa loucura, mirando o Comissário Gordon e sua filha Barbara.',
  },
  {
    id: '5',
    titulo: 'Desafio Infinito',
    autor: 'Jim Starlin & George Pérez',
    editora: 'Marvel',
    categoria: 'Marvel',
    progresso: 15,
    paginas: 256,
    nota: '4.8',
    baixado: false,
    naBiblioteca: false,
    capa: require('./assets/hq5.jpg'),
    sinopse:
      'Thanos reúne as seis Joias do Infinito na Manopla e apaga metade da vida no universo com um estalar de dedos. Os heróis restantes da Terra unem forças em uma missão desesperada.',
  },
  {
    id: '6',
    titulo: 'Grandes Astros: Superman',
    autor: 'Grant Morrison & Frank Quitely',
    editora: 'DC Comics',
    categoria: 'DC Comics',
    progresso: 0,
    paginas: 304,
    nota: '4.9',
    baixado: false,
    naBiblioteca: false,
    capa: require('./assets/hq6.jpg'),
    sinopse:
      'Envenenado por uma sobrecarga de radiação solar causada por Lex Luthor, o Homem de Aço decide realizar doze grandes feitos finais para deixar seu legado à Terra.',
  },
  {
    id: '7',
    titulo: 'Homem-Aranha: A Última Caçada',
    autor: 'J.M. DeMatteis & Mike Zeck',
    editora: 'Marvel',
    categoria: 'Marvel',
    progresso: 0,
    paginas: 176,
    nota: '4.7',
    baixado: false,
    naBiblioteca: false,
    capa: require('./assets/hq7.jpg'),
    sinopse:
      'Kraven, o Caçador, derrota o Homem-Aranha, o enterra vivo e assume o manto do herói nas ruas de Nova York para provar que é superior ao seu maior inimigo.',
  },
  {
    id: '8',
    titulo: 'Reino do Amanhã',
    autor: 'Mark Waid & Alex Ross',
    editora: 'DC Comics',
    categoria: 'Clássicos',
    progresso: 30,
    paginas: 232,
    nota: '5.0',
    baixado: true,
    naBiblioteca: false,
    capa: require('./assets/hq8.jpg'),
    sinopse:
      'Quando uma nova geração de meta-humanos violentos sai do controle, um Superman aposentado reorganiza a Liga da Justiça para restaurar a ética heroica no mundo.',
  },
];

const CATEGORIAS = ['Explorar', 'DC Comics', 'Marvel', 'Clássicos'];

export default function Tela1({ navigation }) {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Explorar');
  const [modoEscuro, setModoEscuro] = useState(true);

  const hqsFiltradas = HQS_DATA.filter((hq) => {
    const matchBusca =
      hq.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      hq.autor.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria =
      categoriaAtiva === 'Explorar' || hq.categoria === categoriaAtiva;
    return matchBusca && matchCategoria;
  });

  const daBiblioteca = hqsFiltradas.filter((hq) => hq.naBiblioteca);
  const recomendadas = hqsFiltradas.filter((hq) => !hq.naBiblioteca || categoriaAtiva !== 'Explorar');

  const cores = {
    fundo: modoEscuro ? '#0F111A' : '#F4F5F7',
    card: modoEscuro ? '#1A1E2E' : '#FFFFFF',
    texto: modoEscuro ? '#FFFFFF' : '#141724',
    subtexto: modoEscuro ? '#9BA3B5' : '#5E6778',
    borda: modoEscuro ? '#2A3047' : '#DCDFE6',
    input: modoEscuro ? '#1E2235' : '#E9ECF2',
  };

  const abrirHQ = (hq) => {
    navigation.navigate('Tela3', { hqSelecionada: hq });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: cores.fundo }]}>
      {/* Barra de Pesquisa Estilo Kindle */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: cores.input }]}
          onPress={() => setModoEscuro(!modoEscuro)}
        >
          <Ionicons
            name={modoEscuro ? 'sunny-outline' : 'moon-outline'}
            size={20}
            color="#F5C518"
          />
        </TouchableOpacity>

        <View style={[styles.searchContainer, { backgroundColor: cores.input }]}>
          <Ionicons name="search" size={18} color={cores.subtexto} />
          <TextInput
            style={[styles.searchInput, { color: cores.texto }]}
            placeholder="Pesquisar no Kindle Comics..."
            placeholderTextColor={cores.subtexto}
            value={busca}
            onChangeText={setBusca}
          />
          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Ionicons name="close-circle" size={18} color={cores.subtexto} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Chips de Categorias */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {CATEGORIAS.map((cat) => {
            const ativo = categoriaAtiva === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.chip,
                  {
                    backgroundColor: ativo ? '#E62429' : cores.card,
                    borderColor: ativo ? '#E62429' : cores.borda,
                  },
                ]}
                onPress={() => setCategoriaAtiva(cat)}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: ativo ? '#FFFFFF' : cores.texto },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Seção 1: Da sua biblioteca */}
        <View style={[styles.sectionBox, { borderBottomColor: cores.borda }]}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={22}
              color="#F5C518"
            />
            <Text style={[styles.sectionTitle, { color: cores.texto }]}>
              Da sua biblioteca
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {daBiblioteca.map((hq) => (
              <TouchableOpacity
                key={hq.id}
                style={styles.bookCardLarge}
                activeOpacity={0.85}
                onPress={() => abrirHQ(hq)}
              >
                <View style={styles.coverWrapperLarge}>
                  <Image source={hq.capa} style={styles.coverImageLarge} />
                  <View
                    style={[
                      styles.publisherBadge,
                      {
                        backgroundColor:
                          hq.editora === 'Marvel' ? '#E62429' : '#0476F2',
                      },
                    ]}
                  >
                    <Text style={styles.publisherBadgeText}>{hq.editora}</Text>
                  </View>
                  {hq.baixado && (
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    </View>
                  )}
                </View>
                <Text
                  style={[styles.bookTitle, { color: cores.texto }]}
                  numberOfLines={1}
                >
                  {hq.titulo}
                </Text>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${hq.progresso}%` },
                    ]}
                  />
                </View>
                <Text style={[styles.progressLabel, { color: cores.subtexto }]}>
                  {hq.progresso}% lido
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Seção 2: Para você em Quadrinhos de Super-Heróis */}
        <View style={styles.sectionBox}>
          <Text style={[styles.subSectionTitle, { color: cores.texto }]}>
            Para você em Quadrinhos, Heróis e Multiversos
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {recomendadas.map((hq) => (
              <TouchableOpacity
                key={hq.id}
                style={styles.bookCardMedium}
                activeOpacity={0.85}
                onPress={() => abrirHQ(hq)}
              >
                <View style={styles.coverWrapperMedium}>
                  <Image source={hq.capa} style={styles.coverImageMedium} />
                  <View style={styles.ratingPill}>
                    <Ionicons name="star" size={10} color="#F5C518" />
                    <Text style={styles.ratingText}>{hq.nota}</Text>
                  </View>
                </View>
                <Text
                  style={[styles.bookTitle, { color: cores.texto }]}
                  numberOfLines={1}
                >
                  {hq.titulo}
                </Text>
                <Text
                  style={[styles.bookAuthor, { color: cores.subtexto }]}
                  numberOfLines={1}
                >
                  {hq.autor}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Botão Ver mais igual ao print do Kindle */}
          <TouchableOpacity
            style={[styles.verMaisRow, { borderTopColor: cores.borda }]}
            onPress={() => navigation.navigate('Tela2')}
          >
            <Text style={[styles.verMaisText, { color: cores.subtexto }]}>
              Ver mais na Biblioteca de HQs
            </Text>
            <Ionicons name="chevron-forward" size={18} color={cores.subtexto} />
          </TouchableOpacity>
        </View>

        {/* Mini-Player de Leitura Rápida Kindle */}
        <TouchableOpacity
          style={[
            styles.continueReadingBar,
            { backgroundColor: cores.card, borderColor: cores.borda },
          ]}
          onPress={() => abrirHQ(HQS_DATA[0])}
        >
          <Image source={HQS_DATA[0].capa} style={styles.miniCover} />
          <View style={styles.continueInfo}>
            <Text style={styles.continueTag}>CONTINUAR LENDO</Text>
            <Text
              style={[styles.continueTitle, { color: cores.texto }]}
              numberOfLines={1}
            >
              {HQS_DATA[0].titulo}
            </Text>
            <Text style={[styles.continueSub, { color: cores.subtexto }]}>
              Página 174 de 224 • 78% concluído
            </Text>
          </View>
          <Ionicons name="play-circle" size={34} color="#F5C518" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: 14,
    height: 42,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  chipsScroll: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionBox: {
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomWidth: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 8,
    fontFamily: 'serif',
  },
  subSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  horizontalList: {
    paddingHorizontal: 14,
  },
  bookCardLarge: {
    width: 142,
    marginRight: 14,
  },
  coverWrapperLarge: {
    width: 142,
    height: 215,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#222',
    marginBottom: 6,
    position: 'relative',
  },
  coverImageLarge: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  publisherBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  publisherBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  checkBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#111',
    borderWidth: 1.5,
    borderColor: '#F5C518',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  bookAuthor: {
    fontSize: 11,
    marginTop: 2,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#2E344D',
    borderRadius: 2,
    marginTop: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F5C518',
  },
  progressLabel: {
    fontSize: 11,
    marginTop: 3,
  },
  bookCardMedium: {
    width: 122,
    marginRight: 14,
  },
  coverWrapperMedium: {
    width: 122,
    height: 184,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#222',
    marginBottom: 6,
    position: 'relative',
  },
  coverImageMedium: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingPill: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(15, 17, 26, 0.88)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 3,
  },
  verMaisRow: {
    flexDirection: 'row',
    justifyItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
  },
  verMaisText: {
    fontSize: 13,
    fontWeight: '600',
  },
  continueReadingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginBottom: 20,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  miniCover: {
    width: 42,
    height: 62,
    borderRadius: 4,
  },
  continueInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  continueTag: {
    color: '#F5C518',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  continueTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  continueSub: {
    fontSize: 11,
    marginTop: 2,
  },
});