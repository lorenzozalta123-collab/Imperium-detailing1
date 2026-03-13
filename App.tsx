import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const BRAND = {
  name: 'Imperium Detailing',
  phoneDisplay: '+39 375 556 8801',
  phoneRaw: '3755568801',
  email: 'Imperiumdetailing@libero.it',
  instagram: '_imperiumdetailing_',
  instagramUrl: 'https://www.instagram.com/_imperiumdetailing_/',
  whatsappBase: 'https://wa.me/393755568801',
  area: 'Nettuno, Roma, Pomezia, Latina e dintorni',
};

const SERVICES = [
  {
    id: '1',
    title: 'Lavaggio Signature',
    price: 'da €59',
    tag: 'Esterno premium',
    description:
      'Lavaggio esterno luxury con rifiniture accurate, gomme, cerchi e finitura elegante ad alto impatto visivo.',
  },
  {
    id: '2',
    title: 'Interior Prestige',
    price: 'da €89',
    tag: 'Interni deep clean',
    description:
      'Pulizia e igienizzazione dell’abitacolo con cura sartoriale di plastiche, tappetini, sedili e dettagli.',
  },
  {
    id: '3',
    title: 'Lucidatura Atelier',
    price: 'da €179',
    tag: 'Gloss professionale',
    description:
      'Lucidatura studiata per profondità colore, riflessi più ricchi e una resa da showroom.',
  },
  {
    id: '4',
    title: 'Protezione Ceramica Royale',
    price: 'da €349',
    tag: 'Protezione top gamma',
    description:
      'Protezione avanzata della vernice con effetto brillante, manutenzione semplificata e durata superiore.',
  },
];

const PACKAGES = [
  {
    id: 'p1',
    title: 'Elite Care',
    price: 'da €129',
    subtitle: 'Eleganza quotidiana',
    items: ['Esterno completo', 'Cerchi e dettagli premium', 'Finitura elegante'],
  },
  {
    id: 'p2',
    title: 'Grand Prestige',
    price: 'da €269',
    subtitle: 'Il più richiesto',
    featured: true,
    items: ['Esterno + interni', 'Decontaminazione', 'Protezione finale luxury'],
  },
  {
    id: 'p3',
    title: 'Imperium Black',
    price: 'da €449',
    subtitle: 'Il trattamento definitivo',
    items: ['Detailing completo', 'Lucidatura avanzata', 'Protezione top di gamma'],
  },
];

const REVIEWS = [
  {
    id: 'r1',
    author: 'Marco R.',
    text: 'Servizio impeccabile. L’auto sembrava uscita da uno showroom.',
  },
  {
    id: 'r2',
    author: 'Alessia P.',
    text: 'Puntuali, precisi e super professionali. Effetto finale elegantissimo.',
  },
  {
    id: 'r3',
    author: 'Luca M.',
    text: 'Lucidatura clamorosa. Riflessi profondi e finitura davvero premium.',
  },
];

const GALLERY = [
  {
    id: 'g1',
    title: 'Prima / Dopo berlina nera',
    before: 'Opacità, sporco stradale, micro-segni',
    after: 'Gloss profondo, linee pulite, presenza luxury',
  },
  {
    id: 'g2',
    title: 'Prima / Dopo interni',
    before: 'Plastiche spente, polvere, tessuti segnati',
    after: 'Abitacolo fresco, igienizzato, finitura premium',
  },
  {
    id: 'g3',
    title: 'Prima / Dopo SUV',
    before: 'Contaminazioni e finitura piatta',
    after: 'Brillantezza ricca e superficie valorizzata',
  },
];

type TabKey = 'home' | 'services' | 'gallery' | 'booking' | 'contact';

export default function App() {
  const [tab, setTab] = useState<TabKey>('home');
  const [selectedService, setSelectedService] = useState('Lavaggio Signature');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    car: '',
    city: '',
    notes: '',
  });

  const whatsappText = useMemo(() => {
    const body = [
      'Ciao Imperium Detailing, vorrei richiedere informazioni.',
      form.name ? `Nome: ${form.name}` : '',
      form.phone ? `Telefono: ${form.phone}` : '',
      form.car ? `Auto: ${form.car}` : '',
      form.city ? `Zona: ${form.city}` : '',
      selectedService ? `Servizio: ${selectedService}` : '',
      form.notes ? `Note: ${form.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `${BRAND.whatsappBase}?text=${encodeURIComponent(body)}`;
  }, [form, selectedService]);

  const openUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert('Link non disponibile', 'Non riesco ad aprire questo collegamento su questo dispositivo.');
      return;
    }
    await Linking.openURL(url);
  };

  const callNow = async () => openUrl(`tel:${BRAND.phoneRaw}`);
  const emailNow = async () => openUrl(`mailto:${BRAND.email}`);
  const whatsappNow = async () => openUrl(whatsappText);
  const instagramNow = async () => openUrl(BRAND.instagramUrl);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.appShell}>
        <View style={styles.header}>
          <LogoMark />
          <Pressable style={styles.headerAction} onPress={whatsappNow}>
            <Text style={styles.headerActionText}>Richiedi ora</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          {tab === 'home' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <View style={styles.heroCard}>
                <Text style={styles.eyebrow}>IMPERIUM EXPERIENCE</Text>
                <Text style={styles.heroTitle}>L’eleganza si vede nei dettagli.</Text>
                <Text style={styles.heroText}>
                  App mobile completa per iOS e Android con servizi premium, richiesta appuntamento rapida,
                  contatti diretti e stile luxury nero-oro.
                </Text>

                <View style={styles.heroButtons}>
                  <Pressable style={[styles.primaryButton, styles.flexButton]} onPress={() => setTab('booking')}>
                    <Text style={styles.primaryButtonText}>Prenota ora</Text>
                  </Pressable>
                  <Pressable style={[styles.secondaryButton, styles.flexButton]} onPress={callNow}>
                    <Text style={styles.secondaryButtonText}>Chiama</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.statsRow}>
                <StatCard value="+250" label="Auto trattate" />
                <StatCard value="4.9★" label="Clienti felici" />
                <StatCard value="Mobile" label="Servizio rapido" />
              </View>

              <SectionTitle title="Servizi top" subtitle="Selezione premium" />
              {SERVICES.map((item) => (
                <ServiceCard
                  key={item.id}
                  title={item.title}
                  price={item.price}
                  tag={item.tag}
                  description={item.description}
                  onPress={() => {
                    setSelectedService(item.title);
                    setTab('booking');
                  }}
                />
              ))}

              <SectionTitle title="Pacchetto consigliato" subtitle="Più richiesto" />
              <View style={[styles.packageCard, styles.featuredPackageCard]}>
                <Text style={styles.featuredBadge}>GRAND PRESTIGE</Text>
                <Text style={styles.featuredPrice}>da €269</Text>
                <Text style={styles.featuredText}>
                  Trattamento completo con resa visiva superiore e impostazione luxury su esterno e interni.
                </Text>
                <Pressable
                  style={styles.darkButton}
                  onPress={() => {
                    setSelectedService('Grand Prestige');
                    setTab('booking');
                  }}
                >
                  <Text style={styles.darkButtonText}>Richiedi Grand Prestige</Text>
                </Pressable>
              </View>

              <SectionTitle title="Prima & Dopo" subtitle="Trasformazioni" />
              {GALLERY.map((item) => (
                <BeforeAfterCard key={item.id} title={item.title} before={item.before} after={item.after} />
              ))}

              <SectionTitle title="Recensioni" subtitle="Chi ci sceglie" />
              {REVIEWS.map((review) => (
                <Card key={review.id}>
                  <Text style={styles.cardTitle}>{review.author}</Text>
                  <Text style={styles.cardText}>“{review.text}”</Text>
                </Card>
              ))}
            </ScrollView>
          )}

          {tab === 'services' && (
            <FlatList
              data={[
                ...SERVICES.map((s) => ({ id: s.id, title: s.title, price: s.price, description: s.description, tag: s.tag })),
                ...PACKAGES.map((p) => ({ id: p.id, title: p.title, price: p.price, description: p.items.join(' • '), tag: p.subtitle })),
              ]}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <ServiceCard
                  title={item.title}
                  price={item.price}
                  tag={item.tag}
                  description={item.description}
                  onPress={() => {
                    setSelectedService(item.title);
                    setTab('booking');
                  }}
                />
              )}
            />
          )}

          {tab === 'gallery' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <SectionTitle title="Galleria risultati" subtitle="Prima e dopo" />
              {GALLERY.map((item) => (
                <BeforeAfterCard key={item.id} title={item.title} before={item.before} after={item.after} />
              ))}
              <Card>
                <Text style={styles.cardTitle}>Instagram</Text>
                <Text style={styles.cardText}>
                  Collega questa sezione ai tuoi reel, caroselli e risultati reali per trasformarla in una galleria ancora più forte.
                </Text>
                <Pressable style={styles.inlineButton} onPress={instagramNow}>
                  <Text style={styles.inlineButtonText}>Apri Instagram</Text>
                </Pressable>
              </Card>
            </ScrollView>
          )}

          {tab === 'booking' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <SectionTitle title="Prenota il tuo trattamento" subtitle="Richiesta veloce" />
              <Card>
                <Label text="Servizio" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
                  {[...SERVICES.map((s) => s.title), ...PACKAGES.map((p) => p.title)].map((service) => {
                    const active = selectedService === service;
                    return (
                      <Pressable
                        key={service}
                        onPress={() => setSelectedService(service)}
                        style={[styles.chip, active && styles.chipActive]}
                      >
                        <Text style={[styles.chipText, active && styles.chipTextActive]}>{service}</Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>

                <Label text="Nome e cognome" />
                <StyledInput value={form.name} onChangeText={(value) => setForm((s) => ({ ...s, name: value }))} placeholder="Il tuo nome" />

                <Label text="Telefono" />
                <StyledInput value={form.phone} onChangeText={(value) => setForm((s) => ({ ...s, phone: value }))} placeholder="Il tuo numero" keyboardType="phone-pad" />

                <Label text="Auto" />
                <StyledInput value={form.car} onChangeText={(value) => setForm((s) => ({ ...s, car: value }))} placeholder="Marca e modello" />

                <Label text="Zona / città" />
                <StyledInput value={form.city} onChangeText={(value) => setForm((s) => ({ ...s, city: value }))} placeholder="Es. Nettuno, Roma, Pomezia" />

                <Label text="Note" />
                <StyledInput
                  value={form.notes}
                  onChangeText={(value) => setForm((s) => ({ ...s, notes: value }))}
                  placeholder="Spiega cosa ti serve"
                  multiline
                  numberOfLines={4}
                  inputStyle={styles.textArea}
                />

                <Pressable style={styles.primaryButton} onPress={whatsappNow}>
                  <Text style={styles.primaryButtonText}>Invia su WhatsApp</Text>
                </Pressable>
              </Card>

              <Card>
                <Text style={styles.cardTitle}>Prenotazione smart</Text>
                <Text style={styles.cardText}>
                  Questa schermata è già pronta per essere collegata in futuro a un vero backend, calendario appuntamenti o CRM clienti.
                </Text>
              </Card>
            </ScrollView>
          )}

          {tab === 'contact' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <SectionTitle title="Contatti" subtitle="Sempre raggiungibile" />
              <Card>
                <Text style={styles.contactLine}>📞 {BRAND.phoneDisplay}</Text>
                <Text style={styles.contactLine}>✉️ {BRAND.email}</Text>
                <Text style={styles.contactLine}>📲 @{BRAND.instagram}</Text>
                <Text style={styles.contactLine}>📍 {BRAND.area}</Text>
              </Card>

              <Pressable style={styles.primaryButton} onPress={whatsappNow}>
                <Text style={styles.primaryButtonText}>Apri WhatsApp</Text>
              </Pressable>
              <Pressable style={styles.secondaryButtonBlock} onPress={callNow}>
                <Text style={styles.secondaryButtonText}>Chiama</Text>
              </Pressable>
              <Pressable style={styles.secondaryButtonBlock} onPress={emailNow}>
                <Text style={styles.secondaryButtonText}>Invia email</Text>
              </Pressable>
              <Pressable style={styles.secondaryButtonBlock} onPress={instagramNow}>
                <Text style={styles.secondaryButtonText}>Apri Instagram</Text>
              </Pressable>

              <Card>
                <Text style={styles.cardTitle}>Logo incluso</Text>
                <Text style={styles.cardText}>
                  Ho inserito un’identità visiva base con corona, naming forte e atmosfera nero-oro. Si può rifinire ancora con un logo definitivo vettoriale.
                </Text>
              </Card>
            </ScrollView>
          )}
        </View>

        <View style={styles.tabBar}>
          <TabButton active={tab === 'home'} label="Home" onPress={() => setTab('home')} />
          <TabButton active={tab === 'services'} label="Servizi" onPress={() => setTab('services')} />
          <TabButton active={tab === 'gallery'} label="Gallery" onPress={() => setTab('gallery')} />
          <TabButton active={tab === 'booking'} label="Prenota" onPress={() => setTab('booking')} />
          <TabButton active={tab === 'contact'} label="Contatti" onPress={() => setTab('contact')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function LogoMark() {
  return (
    <View style={styles.logoWrap}>
      <View style={styles.logoCrest}>
        <Text style={styles.logoCrestText}>👑</Text>
      </View>
      <View>
        <Text style={styles.logoTitle}>IMPERIUM</Text>
        <Text style={styles.logoSubtitle}>DETAILING</Text>
      </View>
    </View>
  );
}

function ServiceCard({
  title,
  price,
  tag,
  description,
  onPress,
}: {
  title: string;
  price: string;
  tag: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Card>
      <View style={styles.cardRowBetween}>
        <View style={{ flex: 1 }}>
          <Text style={styles.miniTag}>{tag}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <Text style={styles.cardPrice}>{price}</Text>
      </View>
      <Text style={styles.cardText}>{description}</Text>
      <Pressable style={styles.inlineButton} onPress={onPress}>
        <Text style={styles.inlineButtonText}>Seleziona</Text>
      </Pressable>
    </Card>
  );
}

function BeforeAfterCard({ title, before, after }: { title: string; before: string; after: string }) {
  return (
    <Card>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.beforeAfterWrap}>
        <View style={styles.beforeBox}>
          <Text style={styles.beforeAfterLabel}>PRIMA</Text>
          <Text style={styles.beforeText}>{before}</Text>
        </View>
        <View style={styles.afterBox}>
          <Text style={styles.beforeAfterLabelDark}>DOPO</Text>
          <Text style={styles.afterText}>{after}</Text>
        </View>
      </View>
    </Card>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.sectionTitleWrap}>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function Label({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

function StyledInput({
  inputStyle,
  ...props
}: React.ComponentProps<typeof TextInput> & { inputStyle?: object }) {
  return <TextInput placeholderTextColor="#8E7B57" style={[styles.input, inputStyle]} {...props} />;
}

function TabButton({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.tabButton}>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
      {active ? <View style={styles.tabIndicator} /> : <View style={styles.tabIndicatorGhost} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090807',
  },
  appShell: {
    flex: 1,
    backgroundColor: '#090807',
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(192,153,86,0.15)',
    backgroundColor: '#0F0D0A',
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoCrest: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#1B1710',
    borderWidth: 1,
    borderColor: 'rgba(224,188,115,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCrestText: {
    fontSize: 22,
  },
  logoTitle: {
    color: '#E5C485',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
  },
  logoSubtitle: {
    color: '#D5C5A5',
    fontSize: 11,
    letterSpacing: 3,
  },
  headerAction: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#C09956',
  },
  headerActionText: {
    color: '#120F0A',
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
    gap: 14,
  },
  listContent: {
    padding: 16,
    gap: 14,
  },
  heroCard: {
    borderRadius: 28,
    padding: 22,
    backgroundColor: '#12100C',
    borderWidth: 1,
    borderColor: 'rgba(192,153,86,0.22)',
    shadowColor: '#000',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  eyebrow: {
    color: '#D6B777',
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 10,
    fontWeight: '700',
  },
  heroTitle: {
    color: '#F7F1E4',
    fontSize: 31,
    lineHeight: 38,
    fontWeight: '800',
  },
  heroText: {
    color: '#CABDA3',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 12,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  flexButton: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#C09956',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#120F0A',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(192,153,86,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonBlock: {
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(192,153,86,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: '#12100C',
  },
  secondaryButtonText: {
    color: '#F6EEDD',
    fontSize: 16,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#12100C',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(192,153,86,0.14)',
  },
  statValue: {
    color: '#E4C17E',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: '#C9BDA3',
    marginTop: 4,
    fontSize: 12,
  },
  sectionTitleWrap: {
    marginTop: 8,
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#B5955B',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#F6EEDD',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  card: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: '#12100C',
    borderWidth: 1,
    borderColor: 'rgba(192,153,86,0.14)',
  },
  cardRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
  },
  miniTag: {
    color: '#BDA06A',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#F6EEDD',
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
  },
  cardPrice: {
    color: '#E2BC73',
    fontSize: 16,
    fontWeight: '800',
  },
  cardText: {
    color: '#C8BDA7',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  inlineButton: {
    marginTop: 14,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(192,153,86,0.22)',
  },
  inlineButtonText: {
    color: '#EAC985',
    fontWeight: '700',
  },
  packageCard: {
    borderRadius: 26,
    padding: 20,
  },
  featuredPackageCard: {
    backgroundColor: '#C09956',
  },
  featuredBadge: {
    color: '#1A140B',
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: '800',
  },
  featuredPrice: {
    color: '#120F0A',
    fontSize: 34,
    fontWeight: '900',
    marginTop: 10,
  },
  featuredText: {
    color: '#221A0F',
    lineHeight: 23,
    marginTop: 10,
    fontSize: 15,
  },
  darkButton: {
    marginTop: 16,
    backgroundColor: '#15110B',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  darkButtonText: {
    color: '#F6EEDD',
    fontWeight: '800',
  },
  beforeAfterWrap: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  beforeBox: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    backgroundColor: '#0D0B08',
    borderWidth: 1,
    borderColor: 'rgba(192,153,86,0.12)',
  },
  afterBox: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    backgroundColor: '#C09956',
  },
  beforeAfterLabel: {
    color: '#C8BDA7',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  beforeAfterLabelDark: {
    color: '#1B140B',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  beforeText: {
    color: '#E8DDCB',
    marginTop: 8,
    lineHeight: 20,
    fontSize: 13,
  },
  afterText: {
    color: '#18120B',
    marginTop: 8,
    lineHeight: 20,
    fontSize: 13,
    fontWeight: '700',
  },
  chipsScroll: {
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(192,153,86,0.22)',
    marginRight: 8,
    backgroundColor: '#0D0B08',
  },
  chipActive: {
    backgroundColor: '#C09956',
  },
  chipText: {
    color: '#E8C988',
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#171209',
  },
  label: {
    color: '#E8C988',
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#0D0B08',
    borderWidth: 1,
    borderColor: 'rgba(192,153,86,0.18)',
    color: '#F6EEDD',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  contactLine: {
    color: '#F6EEDD',
    fontSize: 16,
    lineHeight: 28,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(192,153,86,0.14)',
    backgroundColor: '#0F0D0A',
  },
  tabButton: {
    alignItems: 'center',
    gap: 6,
    minWidth: 58,
  },
  tabLabel: {
    color: '#A99A7B',
    fontWeight: '700',
    fontSize: 12,
  },
  tabLabelActive: {
    color: '#F0D192',
  },
  tabIndicator: {
    width: 20,
    height: 3,
    borderRadius: 999,
    backgroundColor: '#C09956',
  },
  tabIndicatorGhost: {
    width: 20,
    height: 3,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
});
