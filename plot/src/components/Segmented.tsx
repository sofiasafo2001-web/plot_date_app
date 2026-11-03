import { TextTabs } from './TextTabs';

type Option<T extends string> = { value: T; label: string; badge?: number };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  accessibilityLabel?: string;
};

/** Selector de dos o tres opciones: pestañas de texto subrayadas, con aviso rojo si hay pendientes. */
export function Segmented<T extends string>({ options, value, onChange }: Props<T>) {
  return <TextTabs tabs={options} value={value} onChange={onChange} inset={0} fixed />;
}
