import ToolbarDropdownIcon from './svg/toggler-down.svg';
import './index.css';

// https://editorjs.io/inline-tools-api-1 참고
export default class InlineColor {
	// ==============================================
	// Global
	// ==============================================
	/**
	 * CSS 정의
	 */
	get SELECTOR() {
		return {
			toolbar: '.ce-inline-toolbar',
			menuItem: `.${this.CSS.menuItem}`,
		};
	}

	get CSS() {
		return {
			spen: 'inline-color',
			backdrop: 'inline-color-backdrop',
			toggle: ['ce-inline-toolbar__dropdown', 'inline-color__dropdown'],
			toggleContent: ['ce-inline-toolbar__dropdown-content', 'inline-color__dropdown-content'],
			menu: 'inline-color-menu',
			menuGroup: 'inline-color-menu-group',
			menuTitle: 'inline-color-menu-title',
			menuItem: 'inline-color-menu-item',
			menuItemIcon: 'inline-color-menu-item-icon',
			menuItemText: 'inline-color-menu-item-text',
		};
	}

	get COLORS() {
		return [
			{ key: 'default', value: 'inherit' },
			{ key: 'gray', value: 'rgb(120, 119, 116)' },
			{ key: 'brown', value: 'rgb(159, 107, 83)' },
			{ key: 'orange', value: 'rgb(217, 115, 13)' },
			{ key: 'yellow', value: 'rgb(203, 145, 47)' },
			{ key: 'green', value: 'rgb(68, 131, 97)' },
			{ key: 'blue', value: 'rgb(51, 126, 169)' },
			{ key: 'purple', value: 'rgb(144, 101, 176)' },
			{ key: 'red', value: 'rgb(212, 76, 71)' },
		];
	}

	get BACKGROUNDS() {
		return [
			{ key: 'default', value: 'inherit' },
			{ key: 'gray', value: 'rgb(241, 241, 239)' },
			{ key: 'brown', value: 'rgb(244, 238, 238)' },
			{ key: 'orange', value: 'rgb(251, 236, 221)' },
			{ key: 'yellow', value: 'rgb(251, 243, 219)' },
			{ key: 'green', value: 'rgb(237, 243, 236)' },
			{ key: 'blue', value: 'rgb(231, 243, 248)' },
			{ key: 'purple', value: 'rgba(244, 240, 247, 0.8)' },
			{ key: 'pink', value: 'rgba(249, 238, 243, 0.8)' },
			{ key: 'red', value: 'rgb(253, 235, 236)' },
		];
	}

	// ==============================================
	// Constructor
	// ==============================================
	constructor({ data, config, api, readOnly }) {
		this.api = api;
		this.nodes = {
			backdrop: null,
			toggle: null,
			menu: null,
		};
	}

	// ==============================================
	// Editor.js Api Method
	// ==============================================
	/**
	 * 인라인박스 여부
	 */
	static get isInline() {
		return true;
	}

	/**
	 * 인라인박스에 element 그리기
	 */
	render() {
		// 글자
		const contentElement = this._make('div', this.CSS.toggleContent);
		contentElement.innerHTML = 'A';

		// 아이콘
		const iconElement = this._svg(ToolbarDropdownIcon);

		// 버튼
		this.nodes.toggle = this._make('div', this.CSS.toggle);
		this.nodes.toggle.appendChild(contentElement);
		this.nodes.toggle.appendChild(iconElement);
		return this.nodes.toggle;
	}

	/**
	 * 인라인박스에 있는 element 클릭시
	 */
	surround(range) {
		if (!range) {
			return;
		}

		if (this._isMenu()) {
			this._closeMenu();
		} else {
			this._openMenu(range);
		}
	}

	/**
	 * 범위 선택시, 해당 범위에 태그가 적용중인지 체크하는 부분
	 */
	checkState() {}

	/**
	 * 인라인박스가 닫힐때 실행
	 */
	clear() {
		this._closeMenu();
	}

	// ==============================================
	// Private Methods
	// ==============================================
	/**
	 * element 만들기
	 */
	_make(tagName, classNames = null, attributes = {}) {
		const el = document.createElement(tagName);

		if (Array.isArray(classNames)) {
			el.classList.add(...classNames);
		} else if (classNames) {
			el.classList.add(classNames);
		}

		for (const attrName in attributes) {
			if (Object.prototype.hasOwnProperty.call(attributes, attrName)) {
				el[attrName] = attributes[attrName];
			}
		}

		return el;
	}

	/**
	 * html -> element 만들기
	 */
	_svg(html) {
		const element = this._make('div');
		element.innerHTML = html;
		return element.firstChild;
	}

	/**
	 * 드롭다운메뉴 여부
	 */
	_isMenu() {
		return this.nodes.menu ? true : false;
	}

	/**
	 * 드롭다운메뉴 열기
	 */
	_openMenu(range) {
		this._renderBackdrop(); // backdrop 만들기
		this._renderMenu(range); // 드롭다운메뉴 만들기
	}

	/**
	 * 드롭다운메뉴 닫기
	 */
	_closeMenu() {
		// backdrop 지우기
		if (this.nodes.backdrop) {
			this.nodes.backdrop.remove();
			this.nodes.backdrop = null;
		}

		// 드롭다운메뉴 지우기
		if (this.nodes.menu) {
			this.nodes.menu.remove();
			this.nodes.menu = null;
		}
	}

	/**
	 * backdrop 그리기
	 */
	_renderBackdrop() {
		const toolbarElement = this.nodes.toggle.closest(this.SELECTOR.toolbar);
		this.nodes.backdrop = this._make('div', this.CSS.backdrop);
		toolbarElement.appendChild(this.nodes.backdrop);

		// 클릭 이벤트
		this.nodes.backdrop.addEventListener('click', () => {
			this._closeMenu();
		});
	}

	/**
	 * 드롭다운메뉴 그리기
	 */
	_renderMenu(range) {
		const toolbarElement = this.nodes.toggle.closest(this.SELECTOR.toolbar);
		this.nodes.menu = this._make('div', this.CSS.menu);

		// 글자색 최상단
		const colorGroupElement = this._make('div', this.CSS.menuGroup);

		// 글자색 타이틀
		const colorTitleElement = this._make('div', this.CSS.menuTitle);
		colorTitleElement.innerHTML = '배경';
		colorGroupElement.appendChild(colorTitleElement);

		// 글자색 목록
		this.COLORS.map(color => {
			// 아이콘
			const iconElement = this._make('div', this.CSS.menuItemIcon);
			iconElement.style.color = color.value;
			iconElement.innerHTML = 'A';

			// 텍스트
			const textElement = this._make('div', this.CSS.menuItemText);
			textElement.innerHTML = color.key;

			// 항목
			const itemElement = this._make('div', this.CSS.menuItem);
			itemElement.appendChild(iconElement);
			itemElement.appendChild(textElement);
			colorGroupElement.appendChild(itemElement);

			// 클릭 이벤트
			itemElement.addEventListener('click', () => {
				this._changeColor(range, 'color', color.value);
			});
		});
		this.nodes.menu.appendChild(colorGroupElement);

		// 배경색 최상단
		const bgElement = this._make('div', this.CSS.menuGroup);

		// 배경색 타이틀
		const bgTitleElement = this._make('div', this.CSS.menuTitle);
		bgTitleElement.innerHTML = '배경';
		bgElement.appendChild(bgTitleElement);

		// 배경색 목록
		this.BACKGROUNDS.map(color => {
			// 아이콘
			const iconElement = this._make('div', this.CSS.menuItemIcon);
			iconElement.style.background = color.value;
			iconElement.innerHTML = 'A';

			// 텍스트
			const textElement = this._make('div', this.CSS.menuItemText);
			textElement.innerHTML = color.key;

			// 항목
			const itemElement = this._make('div', this.CSS.menuItem);
			itemElement.appendChild(iconElement);
			itemElement.appendChild(textElement);
			bgElement.appendChild(itemElement);

			// 클릭 이벤트
			itemElement.addEventListener('click', () => {
				this._changeColor(range, 'background', color.value);
			});
		});
		this.nodes.menu.appendChild(bgElement);
		toolbarElement.appendChild(this.nodes.menu);

		// 위치 변경
		var halfWidth = this.nodes.menu.clientWidth / 2 - this.nodes.toggle.clientWidth / 2;
		this.nodes.menu.style.left = this.nodes.toggle.offsetLeft - halfWidth + 'px';
	}

	/**
	 * 변경될 색상이 초기화인 경우, 색상 삭제
	 * 초기화가 아닌 경우, 색상 변경
	 */
	_changeColor(range, type, color) {
		if (color === 'inherit') {
			this._unwrap(range, type);
		} else {
			this._wrap(range, type, color);
		}
	}

	/**
	 * 선택된 영역에 타입별(글자색, 배경색) 색상 변경
	 */
	_wrap(range, type, color) {
		let spenElement = this.api.selection.findParentTag('SPAN', this.CSS.spen);
		if (spenElement) {
			spenElement.style[type] = color;
		} else {
			const selectedText = range.extractContents();
			spenElement = this._make('span', this.CSS.spen);
			spenElement.appendChild(selectedText);
			spenElement.style[type] = color;
			range.insertNode(spenElement);
			this.api.selection.expandToTag(spenElement);
		}
		this._closeMenu();
	}

	/**
	 * 선택된 영역에 타입별(글자색, 배경색) 색상 변경 취소
	 */
	_unwrap(range, type) {
		const spenElement = this.api.selection.findParentTag('SPAN', this.CSS.spen);
		if (spenElement) {
			spenElement.style[type] = null;
			const color = spenElement.style.color.length > 0;
			const background = spenElement.style.background.length > 0;
			if (!color && !background) {
				const text = range.extractContents();
				spenElement.remove();
				range.insertNode(text);
			}
		}
		this._closeMenu();
	}
}
