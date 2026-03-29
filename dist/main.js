/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const app_controller_1 = __webpack_require__(4);
const app_service_1 = __webpack_require__(5);
const webhooks_controller_1 = __webpack_require__(6);
const calls_controller_1 = __webpack_require__(19);
const calls_service_1 = __webpack_require__(7);
const scenario_service_1 = __webpack_require__(8);
const ai_service_1 = __webpack_require__(11);
const telnyx_service_1 = __webpack_require__(15);
const ai_operator_service_1 = __webpack_require__(18);
const streaming_stt_service_1 = __webpack_require__(16);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController, webhooks_controller_1.WebhooksController, calls_controller_1.CallsController],
        providers: [
            app_service_1.AppService,
            calls_service_1.CallsService,
            scenario_service_1.ScenarioService,
            ai_service_1.AiService,
            telnyx_service_1.TelnyxService,
            ai_operator_service_1.AiOperatorService,
            streaming_stt_service_1.StreamingSttService,
        ],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(5);
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(3);
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhooksController = void 0;
const common_1 = __webpack_require__(3);
const calls_service_1 = __webpack_require__(7);
const scenario_service_1 = __webpack_require__(8);
const telnyx_service_1 = __webpack_require__(15);
const streaming_stt_service_1 = __webpack_require__(16);
let WebhooksController = class WebhooksController {
    callsService;
    scenarioService;
    telnyxService;
    streamingSttService;
    constructor(callsService, scenarioService, telnyxService, streamingSttService) {
        this.callsService = callsService;
        this.scenarioService = scenarioService;
        this.telnyxService = telnyxService;
        this.streamingSttService = streamingSttService;
    }
    async telnyxWebhook(body) {
        console.log('TELNYX WEBHOOK BODY:', JSON.stringify(body));
        const eventType = body?.data?.event_type;
        const payload = body?.data?.payload;
        const callControlId = payload?.call_control_id;
        const direction = payload?.direction;
        const from = payload?.from;
        const to = payload?.to;
        let status = null;
        if (eventType === 'call.initiated')
            status = 'initiated';
        if (eventType === 'call.answered')
            status = 'answered';
        if (eventType === 'call.hangup')
            status = 'hangup';
        if (callControlId && eventType === 'call.initiated' && direction === 'outgoing' && to) {
            const pendingMode = this.callsService.consumeNextOutboundMode(to);
            if (pendingMode) {
                this.callsService.setCallMode(callControlId, pendingMode);
                console.log('OUTBOUND MODE ATTACHED:', {
                    callControlId,
                    to,
                    mode: pendingMode,
                });
            }
        }
        if (callControlId && status) {
            const existing = this.callsService.findAll().find((c) => c.id === callControlId);
            this.callsService.upsertCall({
                id: callControlId,
                from: from ?? existing?.from ?? '',
                to: to ?? existing?.to ?? '',
                direction: direction ?? existing?.direction ?? 'incoming',
                status,
            });
        }
        try {
            if (eventType === 'call.initiated' && direction === 'incoming' && callControlId) {
                await this.telnyxService.answerCall(callControlId);
            }
            if (eventType === 'call.answered' && callControlId) {
                const answeredAt = new Date().toISOString();
                console.log('CALL ANSWERED HANDLER:', {
                    callControlId,
                    answeredAt,
                    from,
                    to,
                    direction,
                });
                await this.telnyxService.startStreaming(callControlId);
                const mode = this.callsService.getCallMode(callControlId);
                if (mode === 'ai') {
                    await this.telnyxService.startPlayback(callControlId, 'https://calls.mycallsagent.agency/audio/beep-start.wav');
                }
                console.log('CALL ANSWERED MODE:', {
                    callControlId,
                    mode,
                    answeredAt,
                });
                if (mode === 'scenario') {
                    await this.scenarioService.startScenario(callControlId);
                }
                if (mode === 'ai') {
                    console.log('AI MODE ACTIVE: scenario skipped', { callControlId });
                }
            }
            if (eventType === 'call.speak.started' && callControlId) {
                const mode = this.callsService.getCallMode(callControlId);
                if (mode === 'ai') {
                    this.streamingSttService.markBotSpeaking(callControlId);
                }
            }
            if (eventType === 'call.speak.ended' && callControlId) {
                const mode = this.callsService.getCallMode(callControlId);
                if (mode === 'ai') {
                    this.streamingSttService.markBotStopped(callControlId);
                }
                if (mode === 'scenario') {
                    await this.scenarioService.continueScenario(callControlId);
                }
            }
        }
        catch (err) {
            console.error('TELNYX ERROR:', err);
        }
        return { ok: true };
    }
};
exports.WebhooksController = WebhooksController;
__decorate([
    (0, common_1.Post)('telnyx'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "telnyxWebhook", null);
exports.WebhooksController = WebhooksController = __decorate([
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [typeof (_a = typeof calls_service_1.CallsService !== "undefined" && calls_service_1.CallsService) === "function" ? _a : Object, typeof (_b = typeof scenario_service_1.ScenarioService !== "undefined" && scenario_service_1.ScenarioService) === "function" ? _b : Object, typeof (_c = typeof telnyx_service_1.TelnyxService !== "undefined" && telnyx_service_1.TelnyxService) === "function" ? _c : Object, typeof (_d = typeof streaming_stt_service_1.StreamingSttService !== "undefined" && streaming_stt_service_1.StreamingSttService) === "function" ? _d : Object])
], WebhooksController);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallsService = void 0;
const common_1 = __webpack_require__(3);
let CallsService = class CallsService {
    calls = [];
    scenarioStates = {};
    messages = [];
    callModes = {};
    pendingOutboundModes = {};
    findAll() {
        return this.calls;
    }
    upsertCall(call) {
        const existing = this.calls.find(c => c.id === call.id);
        if (existing) {
            existing.status = call.status;
            existing.from = call.from;
            existing.to = call.to;
            existing.direction = call.direction;
            return existing;
        }
        this.calls.push(call);
        return call;
    }
    setScenarioState(callId, state) {
        this.scenarioStates[callId] = state;
        return state;
    }
    getScenarioState(callId) {
        return this.scenarioStates[callId];
    }
    clearScenarioState(callId) {
        delete this.scenarioStates[callId];
    }
    setCallMode(callId, mode) {
        this.callModes[callId] = mode;
        return mode;
    }
    getCallMode(callId) {
        return this.callModes[callId] ?? 'scenario';
    }
    clearCallMode(callId) {
        delete this.callModes[callId];
    }
    markNextOutboundMode(to, mode) {
        const normalizedTo = to.trim();
        if (!normalizedTo) {
            return;
        }
        if (!this.pendingOutboundModes[normalizedTo]) {
            this.pendingOutboundModes[normalizedTo] = [];
        }
        this.pendingOutboundModes[normalizedTo].push(mode);
    }
    consumeNextOutboundMode(to) {
        const normalizedTo = to.trim();
        if (!normalizedTo) {
            return undefined;
        }
        const queue = this.pendingOutboundModes[normalizedTo];
        if (!queue || queue.length === 0) {
            return undefined;
        }
        const mode = queue.shift();
        if (queue.length === 0) {
            delete this.pendingOutboundModes[normalizedTo];
        }
        return mode;
    }
    normalize(text) {
        return text
            .toLowerCase()
            .replace(/[.,!?]+$/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    getLastHumanMessage(callId) {
        const messages = this.messages
            .filter(m => m.callId === callId && m.role === 'human');
        return messages[messages.length - 1];
    }
    addMessage(message) {
        if (message.role === 'human') {
            const current = this.normalize(message.textEs);
            const last = this.getLastHumanMessage(message.callId);
            if (last) {
                const prev = this.normalize(last.textEs);
                if (current === prev) {
                    return;
                }
                if (prev.includes(current)) {
                    return;
                }
            }
        }
        const newMessage = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            timestamp: new Date().toISOString(),
            ...message,
        };
        this.messages.push(newMessage);
        return newMessage;
    }
    getMessagesByCallId(callId) {
        return this.messages.filter(message => message.callId === callId);
    }
};
exports.CallsService = CallsService;
exports.CallsService = CallsService = __decorate([
    (0, common_1.Injectable)()
], CallsService);


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScenarioService = void 0;
const common_1 = __webpack_require__(3);
const node_fetch_1 = __importDefault(__webpack_require__(9));
const calls_service_1 = __webpack_require__(7);
const scenarios_1 = __webpack_require__(10);
const ai_service_1 = __webpack_require__(11);
let ScenarioService = class ScenarioService {
    callsService;
    aiService;
    constructor(callsService, aiService) {
        this.callsService = callsService;
        this.aiService = aiService;
    }
    async startScenario(callControlId) {
        const scenario = scenarios_1.scenarios[scenarios_1.defaultScenarioId];
        this.callsService.setCallMode(callControlId, 'scenario');
        this.callsService.setScenarioState(callControlId, {
            scenarioId: scenario.id,
            currentStepIndex: 0,
        });
        console.log('SCENARIO STARTED:', {
            callControlId,
            scenarioId: scenario.id,
            currentStepIndex: 0,
        });
        await this.executeCurrentStep(callControlId);
    }
    async executeCurrentStep(callControlId) {
        const state = this.callsService.getScenarioState(callControlId);
        if (!state) {
            console.log('SCENARIO STATE NOT FOUND:', { callControlId });
            return;
        }
        const scenario = scenarios_1.scenarios[state.scenarioId];
        if (!scenario) {
            console.log('SCENARIO NOT FOUND:', {
                callControlId,
                scenarioId: state.scenarioId,
            });
            return;
        }
        const step = scenario.steps[state.currentStepIndex];
        if (!step) {
            console.log('SCENARIO FINISHED: no more steps', {
                callControlId,
                scenarioId: scenario.id,
            });
            this.finishScenario(callControlId);
            return;
        }
        console.log('EXECUTE STEP:', {
            callControlId,
            scenarioId: scenario.id,
            currentStepIndex: state.currentStepIndex,
            step,
        });
        if (step.type === 'speak') {
            const translatedText = await this.aiService.translateEsToRu(step.text);
            this.callsService.addMessage({
                callId: callControlId,
                role: 'bot',
                textEs: step.text,
                textRu: translatedText,
            });
            const apiKey = process.env.TELNYX_API_KEY;
            const speakResponse = await (0, node_fetch_1.default)(`https://api.telnyx.com/v2/calls/${callControlId}/actions/speak`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    payload: step.text,
                    voice: 'AWS.Polly.Lucia',
                }),
            });
            const speakText = await speakResponse.text();
            console.log('SPEAK STATUS:', speakResponse.status);
            console.log('SPEAK BODY:', speakText);
            return;
        }
        if (step.type === 'pause' && step.duration) {
            setTimeout(() => {
                void this.continueScenario(callControlId);
            }, step.duration * 1000);
            return;
        }
        if (step.type === 'hangup') {
            const apiKey = process.env.TELNYX_API_KEY;
            const hangupResponse = await (0, node_fetch_1.default)(`https://api.telnyx.com/v2/calls/${callControlId}/actions/hangup`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            const hangupText = await hangupResponse.text();
            console.log('HANGUP STATUS:', hangupResponse.status);
            console.log('HANGUP BODY:', hangupText);
            this.finishScenario(callControlId);
        }
    }
    async continueScenario(callControlId) {
        const mode = this.callsService.getCallMode(callControlId);
        if (mode === 'operator') {
            console.log('SCENARIO STOPPED: operator mode active', { callControlId });
            return;
        }
        const state = this.callsService.getScenarioState(callControlId);
        if (!state) {
            console.log('CONTINUE FAILED: scenario state not found', { callControlId });
            return;
        }
        this.callsService.setScenarioState(callControlId, {
            ...state,
            currentStepIndex: state.currentStepIndex + 1,
        });
        console.log('SCENARIO CONTINUED:', {
            callControlId,
            nextStepIndex: state.currentStepIndex + 1,
        });
        await this.executeCurrentStep(callControlId);
    }
    finishScenario(callControlId) {
        this.callsService.clearScenarioState(callControlId);
        this.callsService.clearCallMode(callControlId);
        console.log('SCENARIO CLEARED:', { callControlId });
    }
};
exports.ScenarioService = ScenarioService;
exports.ScenarioService = ScenarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof calls_service_1.CallsService !== "undefined" && calls_service_1.CallsService) === "function" ? _a : Object, typeof (_b = typeof ai_service_1.AiService !== "undefined" && ai_service_1.AiService) === "function" ? _b : Object])
], ScenarioService);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultScenarioId = exports.scenarios = void 0;
exports.scenarios = {
    rent_basic_es: {
        id: 'rent_basic_es',
        name: 'Аренда — базовый сценарий',
        language: 'es',
        steps: [
            { type: 'speak', text: 'Hola, llamo por el anuncio del piso que vi en internet.' },
            { type: 'pause', duration: 3 },
            { type: 'speak', text: 'Quería saber si todavía está disponible.' },
            { type: 'pause', duration: 3 },
            { type: 'speak', text: '¿En qué zona está exactamente el piso?' },
            { type: 'pause', duration: 3 },
            { type: 'speak', text: '¿Cuál es el precio mensual y qué incluye?' },
            { type: 'pause', duration: 3 },
            { type: 'speak', text: '¿Hay algún gasto adicional como comunidad o luz?' },
            { type: 'pause', duration: 3 },
            { type: 'speak', text: '¿Está amueblado o vacío?' },
            { type: 'pause', duration: 3 },
            { type: 'speak', text: '¿Se puede visitar esta semana?' },
            { type: 'pause', duration: 3 },
            { type: 'speak', text: '¿Cuál sería el horario disponible para la visita?' },
            { type: 'pause', duration: 3 },
            { type: 'speak', text: 'Vale, perfecto, muchas gracias por la información.' },
            { type: 'pause', duration: 2 },
            { type: 'hangup' }
        ]
    }
};
exports.defaultScenarioId = 'rent_basic_es';


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiService = void 0;
const common_1 = __webpack_require__(3);
const node_fetch_1 = __importDefault(__webpack_require__(9));
const form_data_1 = __importDefault(__webpack_require__(12));
const fs_1 = __importDefault(__webpack_require__(13));
const ai_role_profiles_1 = __webpack_require__(14);
let AiService = class AiService {
    async translateRuToEs(text) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('OPENAI_API_KEY not set');
            return text;
        }
        try {
            const response = await (0, node_fetch_1.default)('https://api.openai.com/v1/responses', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4.1-mini',
                    input: `Translate this text from Russian to Spanish. Only return translated text:\n\n${text}`,
                }),
            });
            const data = await response.json();
            const translated = data?.output?.[0]?.content?.[0]?.text;
            return translated || text;
        }
        catch (err) {
            console.error('TRANSLATION ERROR:', err);
            return text;
        }
    }
    async translateEsToRu(text) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('OPENAI_API_KEY not set');
            return text;
        }
        try {
            const response = await (0, node_fetch_1.default)('https://api.openai.com/v1/responses', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4.1-mini',
                    input: `Translate this text from Spanish to Russian. Only return translated text:\n\n${text}`,
                }),
            });
            const data = await response.json();
            const translated = data?.output?.[0]?.content?.[0]?.text;
            return translated || text;
        }
        catch (err) {
            console.error('TRANSLATION ERROR:', err);
            return text;
        }
    }
    async transcribeWavFile(filePath) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('OPENAI_API_KEY not set');
            return '';
        }
        try {
            const form = new form_data_1.default();
            form.append('file', fs_1.default.createReadStream(filePath));
            form.append('model', 'gpt-4o-transcribe');
            const response = await (0, node_fetch_1.default)('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    ...form.getHeaders(),
                },
                body: form,
            });
            const data = await response.json();
            const text = data?.text ?? '';
            console.log('TRANSCRIBE STATUS:', response.status);
            console.log('TRANSCRIBE TEXT:', text);
            return text;
        }
        catch (err) {
            console.error('TRANSCRIBE ERROR:', err);
            return '';
        }
    }
    async generateOperatorReply(messages) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('OPENAI_API_KEY not set');
            return '';
        }
        const activeProfile = ai_role_profiles_1.aiRoleProfiles.rental_listing;
        const roleProfilePrompt = (0, ai_role_profiles_1.buildRoleProfilePrompt)(activeProfile);
        const recentMessages = messages.slice(-12);
        const historyText = recentMessages
            .map((message) => {
            const roleLabel = message.role === 'human'
                ? 'CLIENT'
                : message.role === 'operator'
                    ? 'OPERATOR'
                    : 'AGENT';
            return `${roleLabel}: ${message.textEs}`;
        })
            .join('\n');
        const input = [
            'You are generating the next reply for a live outbound phone call.',
            'Reply only in Spanish.',
            'Write only the next spoken agent reply.',
            'Keep it natural for a real phone conversation in Spain.',
            'Usually keep it brief: 1 to 2 sentences.',
            'Ask only one clear question at a time when possible.',
            'Do not invent facts, names, addresses, prices, or documents.',
            'Do not act like inbound customer support or a general help desk.',
            'Do not ask generic questions if a concrete context-aware question is possible.',
            '',
            roleProfilePrompt,
            '',
            'Conversation history:',
            historyText,
            '',
            'Now write the next agent reply in Spanish only.',
        ].join('\n');
        try {
            const response = await (0, node_fetch_1.default)('https://api.openai.com/v1/responses', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4.1-mini',
                    input,
                }),
            });
            const data = await response.json();
            const reply = data?.output?.[0]?.content?.[0]?.text?.trim() ?? '';
            console.log('AI OPERATOR STATUS:', response.status);
            console.log('AI OPERATOR REPLY:', reply);
            return reply;
        }
        catch (err) {
            console.error('AI OPERATOR ERROR:', err);
            return '';
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("form-data");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.aiRoleProfiles = void 0;
exports.buildRoleProfilePrompt = buildRoleProfilePrompt;
exports.aiRoleProfiles = {
    rental_listing: {
        id: 'rental_listing',
        title: 'Звонок по объявлению об аренде жилья',
        agentIdentity: 'You are a Spanish-speaking outbound calling assistant. You are calling about a housing rental listing on behalf of an interested renter. You are not an inbound support line and not a general help desk.',
        callContext: 'This is an outbound call to the owner, agent, or contact person of a housing rental listing in Spain. The other person may not know who is calling, so you must quickly and clearly explain the reason for the call.',
        primaryGoal: 'First confirm whether the listing is still available. If it is available, collect the most important details needed to evaluate the property and decide the next step.',
        secondaryGoals: [
            'Confirm whether the property is still available.',
            'Clarify what type of property it is and the main characteristics.',
            'Clarify the area, district, or approximate location if needed.',
            'Ask about rent price and key rental conditions.',
            'Ask about deposit, agency fee, bills, pets, and lease duration when relevant.',
            'Ask when the property can be viewed or when it is available to move in.',
            'Clarify the best next step for follow-up communication.',
        ],
        openingRules: [
            'Start with a short greeting.',
            'Immediately say that you are calling about the rental listing.',
            'Your first meaningful question should be whether the listing is still available.',
            'Keep the opening short, clear, and natural.',
            'Do not act like customer support.',
        ],
        dialogStrategy: [
            'Speak naturally, politely, and briefly.',
            'Ask one question at a time.',
            'Do not jump randomly between topics.',
            'If the person gives a partial answer, ask one short follow-up question.',
            'Keep the conversation focused on the property and the next practical step.',
            'If the person sounds busy or impatient, shorten your phrasing and prioritize the most important questions.',
            'If the person offers useful details spontaneously, adapt and continue logically from that information.',
        ],
        questionPlan: [
            'Check whether the listing is still available.',
            'Clarify the property type and main characteristics.',
            'Clarify the area or address.',
            'Ask about the rental price.',
            'Ask about main conditions such as deposit, agency fee, bills, pets, and lease duration when relevant.',
            'Ask about viewing availability or move-in timing.',
            'Clarify the next step such as viewing, callback, or preferred contact method.',
        ],
        disallowedPhrases: [
            'Do not say things like "How can I help you?"',
            'Do not say things like "What do you want?"',
            'Do not say things like "What is your question?"',
            'Do not say things like "What service do you need?"',
            'Do not behave like an inbound support line.',
            'Do not ask vague generic questions when you can ask a concrete rental-related question.',
        ],
        fallbackRules: [
            'If the person asks who is calling, briefly explain that you are calling about the rental listing.',
            'If the listing is no longer available, first ask whether they have any similar properties currently available.',
            'If they offer a similar alternative property, accept that new context and continue the conversation about the alternative property instead of returning to the old listing.',
            'If the person says the listing is unavailable and there are no alternatives, thank them politely and end the call.',
            'If the person asks for a callback later, agree briefly and ask for a convenient time if appropriate.',
            'If the person does not understand, rephrase more simply and more briefly.',
            'If the person answers very briefly, stay calm and continue with short, practical follow-up questions.',
        ],
        tone: 'Polite, calm, natural, concise, and conversational. Avoid long corporate phrasing.',
        languageRules: [
            'Reply only in Spanish.',
            'Use simple and natural Spanish suitable for a real phone call in Spain.',
            'Do not mix languages unless absolutely necessary.',
            'If the other person speaks very briefly, adapt and keep your replies simple too.',
            'If the person seems confused, rephrase more simply instead of becoming more verbose.',
        ],
        successCriteria: [
            'You confirmed that the listing is no longer available.',
            'You confirmed that the listing is available and collected the most important property details.',
            'You obtained a practical next step such as a viewing, callback, or contact method.',
            'If the original listing is unavailable, you identified whether a similar alternative property exists.',
        ],
    },
};
function buildRoleProfilePrompt(profile) {
    return [
        `Active role profile: ${profile.id}`,
        `Profile title: ${profile.title}`,
        '',
        `Agent identity: ${profile.agentIdentity}`,
        `Call context: ${profile.callContext}`,
        `Primary goal: ${profile.primaryGoal}`,
        '',
        'Secondary goals:',
        ...profile.secondaryGoals.map(item => `- ${item}`),
        '',
        'Opening rules:',
        ...profile.openingRules.map(item => `- ${item}`),
        '',
        'Dialog strategy:',
        ...profile.dialogStrategy.map(item => `- ${item}`),
        '',
        'Question plan:',
        ...profile.questionPlan.map(item => `- ${item}`),
        '',
        'Disallowed phrases and behaviors:',
        ...profile.disallowedPhrases.map(item => `- ${item}`),
        '',
        'Fallback rules:',
        ...profile.fallbackRules.map(item => `- ${item}`),
        '',
        `Tone: ${profile.tone}`,
        '',
        'Language rules:',
        ...profile.languageRules.map(item => `- ${item}`),
        '',
        'Success criteria:',
        ...profile.successCriteria.map(item => `- ${item}`),
    ].join('\n');
}


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TelnyxService = void 0;
const common_1 = __webpack_require__(3);
const node_fetch_1 = __importDefault(__webpack_require__(9));
let TelnyxService = class TelnyxService {
    async answerCall(callControlId) {
        const apiKey = process.env.TELNYX_API_KEY;
        if (!apiKey) {
            console.error('TELNYX_API_KEY not set');
            return;
        }
        console.log('TELNYX ANSWER REQUEST:', {
            callControlId,
            at: new Date().toISOString(),
        });
        const response = await (0, node_fetch_1.default)(`https://api.telnyx.com/v2/calls/${callControlId}/actions/answer`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        const text = await response.text();
        console.log('ANSWER STATUS:', response.status);
        console.log('ANSWER BODY:', text);
    }
    async startStreaming(callControlId) {
        const apiKey = process.env.TELNYX_API_KEY;
        const streamUrl = 'wss://calls.mycallsagent.agency/api/telnyx-stream';
        if (!apiKey) {
            console.error('TELNYX_API_KEY not set');
            return;
        }
        console.log('TELNYX STREAMING_START REQUEST:', {
            callControlId,
            at: new Date().toISOString(),
            streamUrl,
        });
        const response = await (0, node_fetch_1.default)(`https://api.telnyx.com/v2/calls/${callControlId}/actions/streaming_start`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stream_url: streamUrl,
                stream_track: 'both_tracks',
            }),
        });
        const text = await response.text();
        console.log('STREAMING START STATUS:', response.status);
        console.log('STREAMING START BODY:', text);
    }
    async startPlayback(callControlId, audioUrl) {
        const apiKey = process.env.TELNYX_API_KEY;
        if (!apiKey) {
            console.error('TELNYX_API_KEY not set');
            return;
        }
        console.log('TELNYX PLAYBACK_START REQUEST:', {
            callControlId,
            audioUrl,
            at: new Date().toISOString(),
        });
        const response = await (0, node_fetch_1.default)(`https://api.telnyx.com/v2/calls/${callControlId}/actions/playback_start`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                audio_url: audioUrl,
            }),
        });
        const text = await response.text();
        console.log('PLAYBACK START STATUS:', response.status);
        console.log('PLAYBACK START BODY:', text);
    }
    async stopSpeak(callControlId) {
        const apiKey = process.env.TELNYX_API_KEY;
        if (!apiKey) {
            console.error('TELNYX_API_KEY not set');
            return;
        }
        console.log('TELNYX PLAYBACK_STOP REQUEST:', {
            callControlId,
            at: new Date().toISOString(),
        });
        const response = await (0, node_fetch_1.default)(`https://api.telnyx.com/v2/calls/${callControlId}/actions/playback_stop`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        const text = await response.text();
        console.log('PLAYBACK STOP STATUS:', response.status);
        console.log('PLAYBACK STOP BODY:', text);
    }
};
exports.TelnyxService = TelnyxService;
exports.TelnyxService = TelnyxService = __decorate([
    (0, common_1.Injectable)()
], TelnyxService);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StreamingSttService = void 0;
const common_1 = __webpack_require__(3);
const ws_1 = __importDefault(__webpack_require__(17));
const calls_service_1 = __webpack_require__(7);
const ai_operator_service_1 = __webpack_require__(18);
const telnyx_service_1 = __webpack_require__(15);
let StreamingSttService = class StreamingSttService {
    callsService;
    aiOperatorService;
    telnyxService;
    sessions = new Map();
    constructor(callsService, aiOperatorService, telnyxService) {
        this.callsService = callsService;
        this.aiOperatorService = aiOperatorService;
        this.telnyxService = telnyxService;
    }
    startSession(callControlId) {
        const existing = this.sessions.get(callControlId);
        if (existing) {
            this.closeRealtimeSession(callControlId, existing);
            this.clearBotSpeakingTimeout(existing);
        }
        const session = {
            totalBytes: 0,
            chunkCount: 0,
            isClosing: false,
            startedAt: Date.now(),
            lastChunkAt: 0,
            ws: null,
            sttConnectionState: 'idle',
            lastPartialText: '',
            lastFinalText: '',
            lastHandledText: '',
            pendingFinalText: '',
            isHandlingTurn: false,
            isBotSpeaking: false,
            botSpeakingTimeout: null,
            wasInterruptedByHuman: false,
            interruptInFlight: false,
        };
        this.sessions.set(callControlId, session);
        console.log('STREAMING STT START SESSION:', callControlId);
        this.openRealtimeSession(callControlId, session);
    }
    pushAudio(callControlId, chunk) {
        const session = this.sessions.get(callControlId);
        if (!session)
            return;
        if (session.isClosing)
            return;
        session.totalBytes += chunk.length;
        session.chunkCount += 1;
        session.lastChunkAt = Date.now();
        this.sendAudioChunk(callControlId, session, chunk);
    }
    stopSession(callControlId) {
        const session = this.sessions.get(callControlId);
        if (session) {
            session.isClosing = true;
            this.clearBotSpeakingTimeout(session);
            setTimeout(() => {
                this.closeRealtimeSession(callControlId, session);
            }, 300);
            this.sessions.delete(callControlId);
        }
    }
    markBotSpeaking(callControlId) {
        const session = this.sessions.get(callControlId);
        if (!session)
            return;
        this.clearBotSpeakingTimeout(session);
        session.isBotSpeaking = true;
    }
    markBotStopped(callControlId) {
        const session = this.sessions.get(callControlId);
        if (!session)
            return;
        this.clearBotSpeakingTimeout(session);
        session.interruptInFlight = false;
    }
    async forceInterrupt(callControlId) {
        const session = this.sessions.get(callControlId);
        if (!session || session.interruptInFlight)
            return;
        session.interruptInFlight = true;
        try {
            await this.telnyxService.stopSpeak(callControlId);
        }
        finally {
            this.clearBotSpeakingTimeout(session);
            session.interruptInFlight = false;
        }
    }
    openRealtimeSession(callControlId, session) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey)
            return;
        session.sttConnectionState = 'opening';
        const ws = new ws_1.default('wss://api.openai.com/v1/realtime?intent=transcription', {
            headers: { Authorization: `Bearer ${apiKey}` },
        });
        session.ws = ws;
        ws.on('open', () => {
            session.sttConnectionState = 'open';
            ws.send(JSON.stringify({
                type: 'session.update',
                session: {
                    type: 'transcription',
                    audio: {
                        input: {
                            format: { type: 'audio/pcma' },
                            transcription: {
                                model: 'gpt-4o-transcribe',
                                language: 'es'
                            }
                        }
                    }
                }
            }));
        });
        ws.on('message', (data) => {
            const parsed = JSON.parse(data.toString());
            this.handleRealtimeMessage(callControlId, session, parsed);
        });
    }
    sendAudioChunk(callControlId, session, chunk) {
        if (!session.ws || session.ws.readyState !== ws_1.default.OPEN)
            return;
        session.ws.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: chunk.toString('base64'),
        }));
    }
    handleRealtimeMessage(callControlId, session, event) {
        const type = event?.type;
        if (type === 'conversation.item.input_audio_transcription.delta') {
            this.handlePartialTranscript(callControlId, session, event.delta ?? '');
        }
        if (type === 'conversation.item.input_audio_transcription.completed') {
            void this.handleFinalTranscript(callControlId, session, event.transcript ?? '');
        }
    }
    handlePartialTranscript(callControlId, session, text) {
        const partial = text.trim();
        if (!partial)
            return;
        if (session.isBotSpeaking) {
            if (partial.length >= 2 && !this.getEchoReason(callControlId, partial)) {
                void this.forceInterrupt(callControlId);
            }
        }
    }
    async handleFinalTranscript(callControlId, session, text) {
        const transcript = text.trim();
        if (!transcript || transcript.length < 2)
            return;
        if (session.isHandlingTurn) {
            session.pendingFinalText = transcript;
            return;
        }
        session.isHandlingTurn = true;
        try {
            const humanMessage = this.callsService.addMessage({
                callId: callControlId,
                role: 'human',
                textEs: transcript,
                textRu: '',
            });
            if (!humanMessage)
                return;
            await this.aiOperatorService.handleHumanMessage(callControlId);
        }
        finally {
            session.isHandlingTurn = false;
        }
    }
    getEchoReason(callControlId, transcript) {
        return null;
    }
    closeRealtimeSession(callControlId, session) {
        const ws = session.ws;
        if (!ws)
            return;
        session.ws = null;
        try {
            ws.close();
        }
        catch { }
    }
    clearBotSpeakingTimeout(session) {
        if (session.botSpeakingTimeout) {
            clearTimeout(session.botSpeakingTimeout);
            session.botSpeakingTimeout = null;
        }
        session.isBotSpeaking = false;
    }
};
exports.StreamingSttService = StreamingSttService;
exports.StreamingSttService = StreamingSttService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof calls_service_1.CallsService !== "undefined" && calls_service_1.CallsService) === "function" ? _a : Object, typeof (_b = typeof ai_operator_service_1.AiOperatorService !== "undefined" && ai_operator_service_1.AiOperatorService) === "function" ? _b : Object, typeof (_c = typeof telnyx_service_1.TelnyxService !== "undefined" && telnyx_service_1.TelnyxService) === "function" ? _c : Object])
], StreamingSttService);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("ws");

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiOperatorService = void 0;
const common_1 = __webpack_require__(3);
const node_fetch_1 = __importDefault(__webpack_require__(9));
const calls_service_1 = __webpack_require__(7);
const ai_service_1 = __webpack_require__(11);
let AiOperatorService = class AiOperatorService {
    callsService;
    aiService;
    constructor(callsService, aiService) {
        this.callsService = callsService;
        this.aiService = aiService;
    }
    async handleHumanMessage(callId) {
        const messages = this.callsService.getMessagesByCallId(callId);
        if (!messages || messages.length === 0) {
            return;
        }
        const replyEs = await this.aiService.generateOperatorReply(messages);
        if (!replyEs) {
            return;
        }
        const apiKey = process.env.TELNYX_API_KEY;
        const response = await (0, node_fetch_1.default)(`https://api.telnyx.com/v2/calls/${callId}/actions/speak`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payload: replyEs,
                voice: 'AWS.Polly.Lucia',
            }),
        });
        const responseText = await response.text();
        console.log('AI SPEAK RESPONSE:', {
            status: response.status,
            body: responseText,
        });
        this.callsService.addMessage({
            callId,
            role: 'bot',
            textEs: replyEs,
            textRu: '',
        });
        console.log('AI RESPONSE SENT:', {
            callId,
            replyEs,
        });
    }
};
exports.AiOperatorService = AiOperatorService;
exports.AiOperatorService = AiOperatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof calls_service_1.CallsService !== "undefined" && calls_service_1.CallsService) === "function" ? _a : Object, typeof (_b = typeof ai_service_1.AiService !== "undefined" && ai_service_1.AiService) === "function" ? _b : Object])
], AiOperatorService);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallsController = void 0;
const common_1 = __webpack_require__(3);
const node_fetch_1 = __importDefault(__webpack_require__(9));
const calls_service_1 = __webpack_require__(7);
const ai_service_1 = __webpack_require__(11);
let CallsController = class CallsController {
    callsService;
    aiService;
    constructor(callsService, aiService) {
        this.callsService = callsService;
        this.aiService = aiService;
    }
    getCalls() {
        return this.callsService.findAll();
    }
    getMessages(id) {
        return this.callsService.getMessagesByCallId(id);
    }
    async createOutboundCall(body) {
        const to = body.to;
        const from = '+34960291053';
        const apiKey = process.env.TELNYX_API_KEY;
        const response = await (0, node_fetch_1.default)('https://api.telnyx.com/v2/calls', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                connection_id: process.env.TELNYX_CONNECTION_ID,
                to,
                from,
            }),
        });
        const data = await response.json();
        return data;
    }
    async createAiOutboundCall(body) {
        const to = body?.to?.trim();
        const from = '+34960291053';
        const apiKey = process.env.TELNYX_API_KEY;
        if (!to) {
            return {
                success: false,
                error: 'to is required',
            };
        }
        this.callsService.markNextOutboundMode(to, 'ai');
        const response = await (0, node_fetch_1.default)('https://api.telnyx.com/v2/calls', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                connection_id: process.env.TELNYX_CONNECTION_ID,
                to,
                from,
            }),
        });
        const data = await response.json();
        return data;
    }
    async hangup(callId) {
        const apiKey = process.env.TELNYX_API_KEY;
        const response = await (0, node_fetch_1.default)(`https://api.telnyx.com/v2/calls/${callId}/actions/hangup`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        const responseText = await response.text();
        console.log('HANGUP STATUS:', response.status);
        console.log('HANGUP BODY:', responseText);
        return {
            success: response.ok,
            callId,
            telnyxStatus: response.status,
            telnyxBody: responseText,
        };
    }
    async speak(callId, body) {
        const textRu = body?.text?.trim();
        if (!textRu) {
            return {
                success: false,
                error: 'text is required',
            };
        }
        const textEs = await this.aiService.translateRuToEs(textRu);
        this.callsService.setCallMode(callId, 'operator');
        const message = this.callsService.addMessage({
            callId,
            role: 'operator',
            textEs,
            textRu,
        });
        const apiKey = process.env.TELNYX_API_KEY;
        const response = await (0, node_fetch_1.default)(`https://api.telnyx.com/v2/calls/${callId}/actions/speak`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payload: textEs,
                voice: 'AWS.Polly.Lucia',
            }),
        });
        const responseText = await response.text();
        console.log('OPERATOR SPEAK STATUS:', response.status);
        console.log('OPERATOR SPEAK BODY:', responseText);
        return {
            success: response.ok,
            callId,
            textRu,
            textEs,
            message,
            telnyxStatus: response.status,
            telnyxBody: responseText,
        };
    }
};
exports.CallsController = CallsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CallsController.prototype, "getCalls", null);
__decorate([
    (0, common_1.Get)(':id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CallsController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('outbound'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallsController.prototype, "createOutboundCall", null);
__decorate([
    (0, common_1.Post)('outbound-ai'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallsController.prototype, "createAiOutboundCall", null);
__decorate([
    (0, common_1.Post)(':id/hangup'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CallsController.prototype, "hangup", null);
__decorate([
    (0, common_1.Post)(':id/speak'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CallsController.prototype, "speak", null);
exports.CallsController = CallsController = __decorate([
    (0, common_1.Controller)('calls'),
    __metadata("design:paramtypes", [typeof (_a = typeof calls_service_1.CallsService !== "undefined" && calls_service_1.CallsService) === "function" ? _a : Object, typeof (_b = typeof ai_service_1.AiService !== "undefined" && ai_service_1.AiService) === "function" ? _b : Object])
], CallsController);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.processRawAudio = processRawAudio;
const fs_1 = __webpack_require__(13);
const node_fetch_1 = __importDefault(__webpack_require__(9));
const form_data_1 = __importDefault(__webpack_require__(12));
function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[¿?¡!.,:;]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function getPostProcessEchoReason(callsService, callControlId, transcriptText) {
    const normalizedTranscript = normalizeText(transcriptText);
    if (!normalizedTranscript) {
        return null;
    }
    const messages = callsService.getMessagesByCallId(callControlId);
    const lastBotMessage = [...messages].reverse().find(message => message.role === 'bot');
    if (!lastBotMessage?.textEs) {
        return null;
    }
    const normalizedBotText = normalizeText(lastBotMessage.textEs);
    if (!normalizedBotText) {
        return null;
    }
    if (normalizedTranscript === normalizedBotText) {
        return 'exact_match_last_bot_message';
    }
    if (normalizedTranscript.length >= 6 &&
        normalizedBotText.includes(normalizedTranscript)) {
        return 'transcript_inside_last_bot_message';
    }
    if (normalizedBotText.length >= 6 &&
        normalizedTranscript.includes(normalizedBotText)) {
        return 'last_bot_message_inside_transcript';
    }
    return null;
}
async function processRawAudio(rawPath, wavPath, callControlId, aiService, callsService, aiOperatorService, allowAiReply) {
    const data = (0, fs_1.readFileSync)(rawPath);
    const header = Buffer.alloc(44);
    header.write('RIFF', 0);
    header.writeUInt32LE(36 + data.length, 4);
    header.write('WAVE', 8);
    header.write('fmt ', 12);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(6, 20);
    header.writeUInt16LE(1, 22);
    header.writeUInt32LE(8000, 24);
    header.writeUInt32LE(8000, 28);
    header.writeUInt16LE(1, 32);
    header.writeUInt16LE(8, 34);
    header.write('data', 36);
    header.writeUInt32LE(data.length, 40);
    (0, fs_1.writeFileSync)(wavPath, Buffer.concat([header, data]));
    console.log('WAV CREATED:', wavPath);
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('OPENAI_API_KEY not set');
        return;
    }
    const form = new form_data_1.default();
    form.append('file', (0, fs_1.readFileSync)(wavPath), {
        filename: 'audio.wav',
        contentType: 'audio/wav',
    });
    form.append('model', 'gpt-4o-transcribe');
    const response = await (0, node_fetch_1.default)('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            ...form.getHeaders(),
        },
        body: form,
    });
    const result = await response.json();
    const transcriptText = result?.text ?? '';
    console.log('TRANSCRIBE STATUS:', response.status);
    console.log('TRANSCRIBE TEXT:', transcriptText);
    if (transcriptText) {
        const translatedText = await aiService.translateEsToRu(transcriptText);
        console.log('TRANSLATE ES->RU:', translatedText);
        if (callControlId) {
            const echoReason = getPostProcessEchoReason(callsService, callControlId, transcriptText);
            if (echoReason) {
                console.log('POST PROCESS HUMAN IGNORED: echo detected', {
                    callControlId,
                    transcriptText,
                    echoReason,
                });
                return;
            }
            callsService.addMessage({
                callId: callControlId,
                role: 'human',
                textEs: transcriptText,
                textRu: translatedText,
            });
            console.log('CALL MESSAGE SAVED:', callControlId);
            const mode = callsService.getCallMode(callControlId);
            if (mode === 'ai' && allowAiReply) {
                console.log('AI MODE: handling human message', { callControlId });
                await aiOperatorService.handleHumanMessage(callControlId);
            }
        }
    }
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const ws_1 = __webpack_require__(17);
const fs_1 = __webpack_require__(13);
const ai_service_1 = __webpack_require__(11);
const calls_service_1 = __webpack_require__(7);
const ai_operator_service_1 = __webpack_require__(18);
const streaming_stt_service_1 = __webpack_require__(16);
const raw_processor_1 = __webpack_require__(20);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
    });
    app.setGlobalPrefix('api');
    const aiService = app.get(ai_service_1.AiService);
    const callsService = app.get(calls_service_1.CallsService);
    const aiOperatorService = app.get(ai_operator_service_1.AiOperatorService);
    const streamingSttService = app.get(streaming_stt_service_1.StreamingSttService);
    const server = app.getHttpServer();
    const wss = new ws_1.WebSocketServer({
        server,
        path: '/api/telnyx-stream',
    });
    wss.on('connection', (ws, req) => {
        console.log('WS CONNECTED:', req.url);
        (0, fs_1.mkdirSync)('/opt/callagent/repo/tmp/telnyx-stream', { recursive: true });
        const basePath = `/opt/callagent/repo/tmp/telnyx-stream/${Date.now()}`;
        const rawPath = `${basePath}.raw`;
        const wavPath = `${basePath}.wav`;
        let messageCount = 0;
        let totalBytes = 0;
        let callControlId = '';
        let streamId = '';
        let connectedCount = 0;
        let startCount = 0;
        let mediaCount = 0;
        let stopCount = 0;
        let firstSequenceNumber = '';
        let lastSequenceNumber = '';
        const wsConnectedAt = Date.now();
        let wsStartAt = 0;
        let firstMediaAt = 0;
        ws.on('message', (message) => {
            messageCount += 1;
            const raw = message.toString();
            try {
                const parsed = JSON.parse(raw);
                const eventType = parsed?.event;
                const sequenceNumber = parsed?.sequence_number;
                if (sequenceNumber) {
                    if (!firstSequenceNumber) {
                        firstSequenceNumber = sequenceNumber;
                    }
                    lastSequenceNumber = sequenceNumber;
                }
                if (eventType === 'connected')
                    connectedCount += 1;
                if (eventType === 'start')
                    startCount += 1;
                if (eventType === 'media')
                    mediaCount += 1;
                if (eventType === 'stop')
                    stopCount += 1;
                if (eventType !== 'media')
                    console.log('WS EVENT TYPE:', eventType);
                if (eventType === 'connected' || eventType === 'start') {
                    console.log('WS CONTROL EVENT:', JSON.stringify(parsed));
                }
                if (eventType === 'start' && !wsStartAt) {
                    wsStartAt = Date.now();
                    console.log('WS START TIMING:', {
                        callControlId: parsed.start?.call_control_id ?? '',
                        wsConnectedToStartMs: wsStartAt - wsConnectedAt,
                    });
                }
                if (eventType === 'start' && parsed.start?.call_control_id) {
                    callControlId = parsed.start.call_control_id;
                    streamId = parsed.stream_id || '';
                    streamingSttService.startSession(callControlId);
                }
                if (eventType === 'media' && parsed.media?.payload) {
                    const chunk = Buffer.from(parsed.media.payload, 'base64');
                    if (!firstMediaAt) {
                        firstMediaAt = Date.now();
                        console.log('WS FIRST MEDIA TIMING:', {
                            callControlId,
                            wsConnectedToFirstMediaMs: firstMediaAt - wsConnectedAt,
                            wsStartToFirstMediaMs: wsStartAt ? firstMediaAt - wsStartAt : null,
                        });
                    }
                    if (callControlId) {
                        streamingSttService.pushAudio(callControlId, chunk);
                    }
                    (0, fs_1.appendFileSync)(rawPath, chunk);
                    totalBytes += chunk.length;
                }
            }
            catch (err) {
                console.error('WS PARSE ERROR:', err);
            }
        });
        ws.on('close', async () => {
            console.log('WS CLOSED');
            console.log('WS SESSION SUMMARY:', {
                callControlId,
                streamId,
                messageCount,
                connectedCount,
                startCount,
                mediaCount,
                stopCount,
                firstSequenceNumber,
                lastSequenceNumber,
                totalBytes,
                wsLifetimeMs: Date.now() - wsConnectedAt,
                wsConnectedToStartMs: wsStartAt ? wsStartAt - wsConnectedAt : null,
                wsConnectedToFirstMediaMs: firstMediaAt ? firstMediaAt - wsConnectedAt : null,
                wsStartToFirstMediaMs: wsStartAt && firstMediaAt ? firstMediaAt - wsStartAt : null,
                noMediaReceived: mediaCount === 0,
            });
            console.log('WS RAW FILE SAVED:', { rawPath, totalBytes });
            if (callControlId) {
                streamingSttService.stopSession(callControlId);
            }
            if (totalBytes === 0) {
                console.log('WS CLOSED: no audio received, skipping post-process');
                return;
            }
            try {
                await (0, raw_processor_1.processRawAudio)(rawPath, wavPath, callControlId, aiService, callsService, aiOperatorService, false);
            }
            catch (err) {
                console.error('POST-PROCESS ERROR:', err);
            }
        });
        ws.on('error', (err) => {
            console.error('WS ERROR:', err);
        });
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

})();

/******/ })()
;