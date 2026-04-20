/* ============================================================
   SMP YPPGI Bethani Bomou — Presensi Selfie
   app.js — Versi Final
   ============================================================ */

document.addEventListener('alpine:init', () => {

    /* ══════════════════════════════════════════
       App() — Root store, routing, semua data
    ══════════════════════════════════════════ */
    Alpine.data('App', () => ({

        /* ── State navigasi ── */
        page: 'login',   // halaman aktif
        adminTab: 'dashboard',

        /* ── Login form ── */
        loginForm: { email: '', password: '' },
        showPass: false,
        loginLoading: false,
        loginError: '',

        /* ── Jam WIT (UTC+9) ── */
        clock: '',
        _clockInterval: null,

        /* ── Toast ── */
        toast: { show: false, message: '', type: 'success', icon: 'bi-check-circle-fill' },

        /* ════════════════════════
           Data Siswa
        ════════════════════════ */
        riwayatTerbaru: [
            { id: 1, type: 'masuk', icon: 'bi-box-arrow-in-right', title: 'Masuk Sekolah', date: 'Jumat, 11 Okt 2024', time: '07:12', status: 'tepat-waktu', label: 'TEPAT WAKTU' },
            { id: 2, type: 'masuk', icon: 'bi-box-arrow-in-right', title: 'Masuk Sekolah', date: 'Kamis, 10 Okt 2024', time: '07:08', status: 'tepat-waktu', label: 'TEPAT WAKTU' },
            { id: 3, type: 'pulang', icon: 'bi-box-arrow-right', title: 'Pulang Sekolah', date: 'Rabu, 09 Okt 2024', time: '14:05', status: 'izin', label: 'IZIN (SAKIT)' },
        ],

        dailyLogs: [
            { id: 1, date: 'OKT 24', masuk: '07:12', pulang: '15:45', status: 'HADIR', statusClass: 'hadir', avatars: true, suratLink: false },
            { id: 2, date: 'OKT 23', masuk: '07:35', pulang: '15:40', status: 'TERLAMBAT', statusClass: 'terlambat', avatars: true, suratLink: false },
            { id: 3, date: 'OKT 22', masuk: '—', pulang: '—', status: 'IZIN (SAKIT)', statusClass: 'sakit', avatars: false, suratLink: true },
            { id: 4, date: 'OKT 21', masuk: '06:55', pulang: '15:50', status: 'HADIR', statusClass: 'hadir', avatars: true, suratLink: false },
        ],

        /* ════════════════════════
           Data Guru — validasi
        ════════════════════════ */
        validasiList: [
            {
                id: 1, nama: 'Marcus Aurelius', info: 'NISN: 0087123991 • Kelas 7A', status: 'SAKIT', statusClass: 'sakit',
                avatar: 'https://ui-avatars.com/api/?name=Marcus+A&background=1a3a5c&color=fff&size=92'
            },
            {
                id: 2, nama: 'Sophia Putri', info: 'NISN: 0087124002 • Kelas 7A', status: 'IZIN', statusClass: 'izin',
                avatar: 'https://ui-avatars.com/api/?name=Sophia+P&background=e07b39&color=fff&size=92'
            },
        ],

        /* ════════════════════════
           Data Admin
        ════════════════════════ */
        weekChart: [
            { day: 'SEN', siswa: 95, guru: 80 },
            { day: 'SEL', siswa: 88, guru: 90 },
            { day: 'RAB', siswa: 100, guru: 85 },
            { day: 'KAM', siswa: 92, guru: 88 },
            { day: 'JUM', siswa: 78, guru: 75 },
            { day: 'SAB', siswa: 40, guru: 50 },
        ],

        activityLog: [
            {
                id: 1, name: 'Ariana Smith', info: 'Siswa • Kelas XI-A', time: '07:12 AM', badge: 'masuk',
                avatar: 'https://ui-avatars.com/api/?name=Ariana+S&background=1a3a5c&color=fff&size=76'
            },
            {
                id: 2, name: 'Jonathan Doe', info: 'Siswa • Kelas XI-C', time: '07:15 AM', badge: 'masuk',
                avatar: 'https://ui-avatars.com/api/?name=Jonathan+D&background=2563eb&color=fff&size=76'
            },
            {
                id: 3, name: 'Sarah Connor', info: 'Siswa • Kelas VIII-B', time: '07:18 AM', badge: 'on',
                avatar: 'https://ui-avatars.com/api/?name=Sarah+C&background=e07b39&color=fff&size=76'
            },
        ],

        distribusiKelas: [
            { id: 1, nama: 'Kelas VII', pct: 90, desc: 'Tingkat kehadiran stabil tinggi', color: 'green' },
            { id: 2, nama: 'Kelas VIII', pct: 82, desc: 'Perlu perhatian ekstra di hari Jumat', color: 'navy' },
            { id: 3, nama: 'Kelas IX', pct: 85, desc: 'Performa kehadiran terbaik minggu ini', color: 'blue' },
        ],

        dataSiswa: [
            {
                id: 1, nis: '2024001', nama: 'Bethani Bomou', kelas: '7A', hadir: 98,
                avatar: 'https://ui-avatars.com/api/?name=B+B&background=1a3a5c&color=fff&size=56'
            },
            {
                id: 2, nis: '2024002', nama: 'Marcus Aurelius', kelas: '7A', hadir: 85,
                avatar: 'https://ui-avatars.com/api/?name=M+A&background=2563eb&color=fff&size=56'
            },
            {
                id: 3, nis: '2024003', nama: 'Sophia Putri', kelas: '7A', hadir: 91,
                avatar: 'https://ui-avatars.com/api/?name=S+P&background=e07b39&color=fff&size=56'
            },
            {
                id: 4, nis: '2024004', nama: 'Ariana Smith', kelas: '7B', hadir: 100,
                avatar: 'https://ui-avatars.com/api/?name=A+S&background=16a34a&color=fff&size=56'
            },
            {
                id: 5, nis: '2024005', nama: 'Jonathan Doe', kelas: '7B', hadir: 77,
                avatar: 'https://ui-avatars.com/api/?name=J+D&background=dc2626&color=fff&size=56'
            },
        ],

        dataGuru: [
            {
                id: 1, nip: '198501012010011001', nama: 'Ibu Sari', mapel: 'Matematika', hadir: 98,
                avatar: 'https://ui-avatars.com/api/?name=Ibu+Sari&background=1a3a5c&color=fff&size=56'
            },
            {
                id: 2, nip: '198709152012012002', nama: 'Pak Budi', mapel: 'B. Indonesia', hadir: 95,
                avatar: 'https://ui-avatars.com/api/?name=Pak+Budi&background=2563eb&color=fff&size=56'
            },
            {
                id: 3, nip: '199203202015011003', nama: 'Ibu Dewi', mapel: 'IPA', hadir: 100,
                avatar: 'https://ui-avatars.com/api/?name=Ibu+Dewi&background=16a34a&color=fff&size=56'
            },
            {
                id: 4, nip: '198811072014011004', nama: 'Pak Agus', mapel: 'IPS', hadir: 90,
                avatar: 'https://ui-avatars.com/api/?name=Pak+Agus&background=e07b39&color=fff&size=56'
            },
        ],

        dataKelas: [
            { id: 1, nama: 'Kelas 7A', wali: 'Ibu Sari', jumlah: 32, hadir: 90 },
            { id: 2, nama: 'Kelas 7B', wali: 'Pak Budi', jumlah: 30, hadir: 87 },
            { id: 3, nama: 'Kelas 8A', wali: 'Ibu Dewi', jumlah: 31, hadir: 82 },
            { id: 4, nama: 'Kelas 8B', wali: 'Pak Agus', jumlah: 29, hadir: 85 },
            { id: 5, nama: 'Kelas 9A', wali: 'Ibu Sari', jumlah: 33, hadir: 88 },
            { id: 6, nama: 'Kelas 9B', wali: 'Pak Budi', jumlah: 31, hadir: 84 },
        ],

        rekapData: [
            { id: 1, tanggal: 'Senin, 14 Okt', hadir: 842, izin: 12, sakit: 8, alpa: 3, pct: 97 },
            { id: 2, tanggal: 'Selasa, 13 Okt', hadir: 830, izin: 15, sakit: 10, alpa: 5, pct: 95 },
            { id: 3, tanggal: 'Rabu, 12 Okt', hadir: 855, izin: 8, sakit: 5, alpa: 2, pct: 98 },
            { id: 4, tanggal: 'Kamis, 11 Okt', hadir: 848, izin: 11, sakit: 7, alpa: 4, pct: 97 },
            { id: 5, tanggal: 'Jumat, 10 Okt', hadir: 820, izin: 18, sakit: 12, alpa: 10, pct: 94 },
        ],

        /* ════════════════════════
           Methods
        ════════════════════════ */

        /** Dipanggil oleh x-init="boot()" pada <body> */
        boot() {
            this._tickClock();
            this._clockInterval = setInterval(() => this._tickClock(), 1000);
        },

        /** Hitung jam WIT (UTC+9) */
        _tickClock() {
            const now = new Date();
            const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
            const wit = new Date(utcMs + 9 * 3_600_000);
            this.clock = wit.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        },

        /** Navigasi ke halaman tertentu */
        nav(target) {
            this.page = target;
            // Scroll ke atas saat pindah halaman
            window.scrollTo(0, 0);
        },

        /** Login normal (form) */
        doLogin() {
            this.loginError = '';
            if (!this.loginForm.email || !this.loginForm.password) {
                this.loginError = 'Email/NIS dan kata sandi wajib diisi.';
                return;
            }
            this.loginLoading = true;
            setTimeout(() => {
                this.loginLoading = false;
                this.nav('dashboard-siswa');
                this.showToast('Selamat datang, Bethani Bomou!', 'success', 'bi-check-circle-fill');
            }, 1000);
        },

        /** Login cepat demo (pilih role) */
        quickLogin(role) {
            this.loginLoading = true;
            setTimeout(() => {
                this.loginLoading = false;
                const dest = {
                    siswa: 'dashboard-siswa',
                    guru: 'dashboard-guru',
                    admin: 'dashboard-admin',
                }[role] || 'dashboard-siswa';
                this.nav(dest);
                this.showToast('Login sebagai ' + role + ' berhasil!', 'success', 'bi-check-circle-fill');
            }, 700);
        },

        /** Validasi kehadiran siswa (guru) */
        doValidasi(siswa) {
            this.validasiList = this.validasiList.filter(s => s.id !== siswa.id);
            this.showToast('Validasi ' + siswa.nama + ' berhasil!', 'success', 'bi-check-circle-fill');
        },

        /** Tampilkan toast */
        showToast(message, type = 'success', icon = 'bi-check-circle-fill') {
            this.toast = { show: true, message, type, icon };
            setTimeout(() => { this.toast.show = false; }, 3000);
        },
    }));


    /* ══════════════════════════════════════════
       Camera() — scope lokal halaman presensi
    ══════════════════════════════════════════ */
    Alpine.data('Camera', () => ({
        ready: false,
        photoSrc: null,
        stream: null,
        clock: '',
        _interval: null,

        init() {
            this._tickClock();
            this._interval = setInterval(() => this._tickClock(), 1000);
            this._startCamera();
        },

        destroy() {
            clearInterval(this._interval);
            this._stopStream();
        },

        _tickClock() {
            const now = new Date();
            const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
            const wit = new Date(utcMs + 9 * 3_600_000);
            this.clock = wit.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        },

        async _startCamera() {
            this.ready = false;
            this.photoSrc = null;

            /* Pastikan $refs sudah tersedia */
            await this.$nextTick();
            const video = this.$refs.video;
            if (!video) return;

            try {
                this.stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
                    audio: false,
                });
                video.srcObject = this.stream;
                video.onloadedmetadata = () => { video.play(); this.ready = true; };
            } catch (_) {
                /* Kamera tidak tersedia (misal: buka dari file://) — mode demo */
                this.ready = true;
            }
        },

        _stopStream() {
            if (this.stream) {
                this.stream.getTracks().forEach(t => t.stop());
                this.stream = null;
            }
        },

        capture() {
            const video = this.$refs.video;
            const canvas = this.$refs.canvas;

            if (video && video.readyState >= 2 && video.videoWidth > 0) {
                /* Kamera aktif → ambil frame nyata */
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                this.photoSrc = canvas.toDataURL('image/jpeg', 0.85);
            } else {
                /* Mode demo → buat placeholder SVG (aman dari btoa unicode) */
                const svg = [
                    '<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg">',
                    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">',
                    '<stop offset="0%" stop-color="#1a3a5c"/>',
                    '<stop offset="100%" stop-color="#2a5080"/>',
                    '</linearGradient></defs>',
                    '<rect width="640" height="480" fill="url(#g)"/>',
                    '<circle cx="320" cy="195" r="75" fill="rgba(255,255,255,0.15)"/>',
                    '<rect x="270" y="160" width="100" height="70" rx="6" fill="rgba(255,255,255,0.18)"/>',
                    '<text x="320" y="340" text-anchor="middle" fill="rgba(255,255,255,0.9)"',
                    ' font-size="20" font-family="sans-serif" font-weight="bold">Foto Presensi Berhasil</text>',
                    '<text x="320" y="375" text-anchor="middle" fill="rgba(255,255,255,0.6)"',
                    ' font-size="14" font-family="sans-serif">JAYAPURA, PAPUA - WIT</text>',
                    '</svg>',
                ].join('');
                this.photoSrc = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
            }
        },

        retake() {
            this.photoSrc = null;
            this._startCamera();
        },

        submit() {
            if (!this.photoSrc) {
                /* Jika belum capture, capture dulu otomatis */
                this.capture();
            }
            /* Kirim ke parent App untuk toast + navigasi */
            this.$dispatch('presensi-submit');
        },
    }));

});

/* ── Listener event dari Camera → App ── */
document.addEventListener('presensi-submit', () => {
    /* Akses Alpine root component melalui $el body */
    const body = document.body;
    if (body._x_dataStack) {
        const app = body._x_dataStack[0];
        if (app) {
            app.showToast('Presensi berhasil disimpan!', 'success', 'bi-check-circle-fill');
            setTimeout(() => app.nav('dashboard-siswa'), 1200);
        }
    }
});