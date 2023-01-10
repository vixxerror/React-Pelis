import "./MultipleSelector.css";

export default function MultipleSelector(props: multipleSelectorProps) {
	function select(item: multipleSelectorModel) {
		const selected = [...props.selected, item];
		const nonSelected = props.nonSelected.filter((value) => value !== item);
		props.onChange(selected, nonSelected);
	}

	function deselect(item: multipleSelectorModel) {
		const nonSelected = [...props.nonSelected, item];
		const selected = props.selected.filter((value) => value !== item);
		props.onChange(selected, nonSelected);
	}

	function selectAll() {
		const selected = [...props.selected, ...props.nonSelected];
		const nonSelected: multipleSelectorModel[] = [];
		props.onChange(selected, nonSelected);
	}

	function deselectAll() {
		const nonSelected = [...props.nonSelected, ...props.selected];
		const selected: multipleSelectorModel[] = [];
		props.onChange(selected, nonSelected);
	}

	return (
		<div className="mb-3">
			<label className="label_form">{props.displayName}</label>
			<div className="multiple-selector">
				<ul className="label_form_white">
					{props.nonSelected.map((item) => (
						<li key={item.key} onClick={() => select(item)}>
							{item.value}
						</li>
					))}
				</ul>
				<div className="multiple-selector-buttons label_form_white">
					<button
						type="button"
						onClick={selectAll}
						className="label_form_white">
						{">>"}
					</button>
					<button
						type="button"
						onClick={deselectAll}
						className="label_form_white">
						{"<<"}
					</button>
				</div>
				<ul>
					{props.selected.map((item) => (
						<li
							key={item.key}
							onClick={() => deselect(item)}
							className="label_form_white">
							{item.value}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

interface multipleSelectorProps {
	displayName: string;
	selected: multipleSelectorModel[];
	nonSelected: multipleSelectorModel[];
	onChange(
		selected: multipleSelectorModel[],
		nonSelected: multipleSelectorModel[]
	): void;
}

export interface multipleSelectorModel {
	key: number;
	value: string;
}
